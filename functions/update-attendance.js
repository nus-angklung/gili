const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async function(event, context) {
    try {
      console.log('here')

      const now = new Date()

      if (!process.env.DEBUG) {
        if (!isValidTimeRange(now) || !isValidDay(now)) {
          throw new Error('Sorry, currently this service is unavailable')
        }
      }
      
      const nusnet = escapeHtml(event.queryStringParameters.nusnet.toUpperCase())
      const name = escapeHtml(event.queryStringParameters.name)
      const code = event.queryStringParameters['code']

      if (code !== (await getUniqueCode())) {
        throw new Error('Invalid attempt.')
      }

      await markAttendance(nusnet, now)
      
      // Redirect to /?name=${name}
      return {
        statusCode: 200,
        body: "OK",
      }
    } catch (err) {
      return {
        statusCode: 401,
        body: "Error: \n" + err.message,
      }
    }
}

async function markAttendance(nusnet, date) {

  // search for the member with given nusnet id
  const response = await notion.databases.query({
    database_id: process.env.NOTION_MEMBERS_DATABASE_ID,
    filter: {
      property: 'nusnet',
      text: {
        equals: nusnet 
      },
    },
  })

  if (response.results.length == 0) {
    throw new Error('Invalid nusnet id!')
  }

  const pageId = response.results[0].id

  const currDate = date.toLocaleDateString('en-GB', {
    timeZone: 'Asia/Singapore',
  }) // "dd/mm/yyyy"
  date.setTime(date.getTime() + 8*60*60*1000) // fixes issues with Notion's timezone settings

  await notion.pages.update({
    page_id: pageId,
    properties: {
      [currDate]: {
        date: {
          start: date.toISOString().slice(0, -1) + '+08:00', // specify GMT+8 timezone
        },
      },
    },
  })

}

async function getUniqueCode(newCode) {
  const response = await notion.pages.retrieve({ page_id: process.env.NOTION_QR_CODE_PAGE_ID })
  return response.properties.code.rich_text[0].text.content
}

/**
 * Util functions
 */

const escapeHtml = str => str.replace(/</g, '\\u003c')

const isValidTimeRange = datetime => {
  // Cloudflare getHours return UTC time. + 8 because we are in GMT +8 tz
  const hr = (datetime.getHours() + 8) % 24
  const min = datetime.getMinutes()
  // 18.30 - 20.59
  if (hr < 18 || hr > 21) return false
  if (hr == 19 || hr == 20) return true
  if (min < 30) return false
}

// only monday and wednesday
const isValidDay = datetime => {
  const day = datetime.getDay()
  return day == 1 || day == 3
}

const redirect = location => {
  return {
    statusCode: 302,
    body: null,
    headers: { 'location': location },
  }
}
