import qrcode from 'qr.js'
import { Client } from '@notionhq/client'
import { NOTION_API_KEY, ADMIN_PSWD, NOTION_QR_CODE_PAGE_ID } from '$lib/env';
import { updateUniqueCode, uid } from './_util';
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query, host }) {
  try {
    if (query.get('password') != ADMIN_PSWD) {
      throw new Error('Wrong password')
    }

    const now = new Date()
    console.log(`A new code is generated at ${now.toISOString()}`)
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
