const qrcode = require('qr.js');
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });


exports.handler = async function (event, context) {
  try {
    if (event.queryStringParameters['password'] != process.env.ADMIN_PSWD) {
      throw new Error('Wrong password')
    }

    const generatedUid = uid()

    // update code in Notion's database
    await updateUniqueCode(generatedUid)

    // return QR code with previously generated code
    const url = new URL('/attendance', "https://" + event.headers.host)
    url.searchParams.append("code", generatedUid)

    const cells = qrcode(url.toString()).modules

    return {
      statusCode: 200,
      body: JSON.stringify({ cells: cells }),
    }
  } catch (err) {
    return {
      statusCode: 401,
      body: err.message
    }
  }
}

async function updateUniqueCode(newCode) {
  const date = new Date() // Date.now()
  date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // GMT+8. Notion only accept ISO string dates
  const datestring = date.toISOString().slice(0, -1) + '+08:00'

  await notion.pages.update({
    page_id: process.env.NOTION_QR_CODE_PAGE_ID,
    properties: {
      code: {
        rich_text: [
          {
            type: "text",
            text: {
              content: newCode,
            },
          },
        ],
      },
      lastUpdateTime: {
        date: {
          start: datestring // in SGT
        }
      }
    },
  })
}

// https://gist.github.com/gordonbrander/2230317#gistcomment-3404537
function uid() {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random()
      .toString(16)
      .slice(2) +
    Date.now()
      .toString(16)
      .slice(4)
  )
}
