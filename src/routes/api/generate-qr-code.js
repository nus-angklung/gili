import qrcode from 'qr.js'
import { Client } from '@notionhq/client'
import { NOTION_API_KEY, ADMIN_PSWD, NOTION_QR_CODE_PAGE_ID } from '$lib/env';
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query, host }) {
  try {
    if (query.get('password') != ADMIN_PSWD) {
      throw new Error('Wrong password')
    }

    const generatedUid = uid()

    // update code in Notion's database
    await updateUniqueCode(generatedUid)

    // return QR code with previously generated code
    const url = new URL('/attendance', "http://" + host)
    url.searchParams.append("code", generatedUid)

    const cells = qrcode(url.toString()).modules

    return {
      status: 200,
      body: JSON.stringify({ cells: cells }),
    }
  } catch (err) {
    return {
      status: 401,
      body: err.message
    }
  }
}

async function updateUniqueCode(newCode) {
  const date = new Date() // Date.now()
  date.setTime(date.getTime() + 8 * 60 * 60 * 1000) // GMT+8. Notion only accept ISO string dates
  const datestring = date.toISOString().slice(0, -1) + '+08:00'

  await notion.pages.update({
    page_id: NOTION_QR_CODE_PAGE_ID,
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
