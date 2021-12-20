import { Client } from '@notionhq/client'
import { NOTION_API_KEY, DEBUG, NOTION_QR_CODE_PAGE_ID, NOTION_MEMBERS_DATABASE_ID } from '$lib/env';
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */

 export async function get({ query, host }) {
  try {
    //get today date
    const now = new Date()
    console.log("Time now: ", now.toISOString())
    const currDate = now.toLocaleDateString('en-GB', {
      timeZone: 'Asia/Singapore',
    })


    const code = "m65821a74dc0582cad357"
    if (code !== (await getUniqueCode())) {
      throw new Error('Invalid attempt.')
    }
    
    //check if its monday or wednesday only
    if (!DEBUG) {
      if (!isValidTimeRange(now) || !isValidDay(now)) {
        throw new Error('Sorry, currently this service is unavailable')
      }
    }

    //add today date to database property
            // const response = await notion.databases.update({
            //   database_id: NOTION_MEMBERS_DATABASE_ID,
            //   properties: {
            //     [currDate] : {
            //       "date" :{}
            //     }
            //   }
            // })
    const data = {properties: {
        [currDate] : {
            "date" : {}
        }
    }};
    url = "https://api.notion.com/v1/databases/" + NOTION_MEMBERS_DATABASE_ID
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Notion-Version': "2021-08-16",
            'Content-Type': 'application/json',
            "Authorization": "Bearer secret_9yLnlBTtpH1CxJP01tBaXhoLfFbCToQkpy2Mk54DFYS"
        },
        body: JSON.stringify(data),
    })
    const successUrl = new URL('/attendance/check', "http://" + host)
    successUrl.searchParams.append("name", "Today's date appended")

    console.log(successUrl.toString())
    return {
      status: 200,
      body: successUrl.toString()
    }


  } catch (err) {
    return {
      status: 401,
      body: "Error: \n" + err.message,
    }
  }
}

async function getUniqueCode(newCode) {
  const response = await notion.pages.retrieve({ page_id: NOTION_QR_CODE_PAGE_ID })
  return response.properties.code.rich_text[0].text.content
}

/**
 * Util functions
 */

const escapeHtml = str => str.replace(/</g, '\\u003c')

const isValidTimeRange = datetime => {
  return true;
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
  return true;
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
