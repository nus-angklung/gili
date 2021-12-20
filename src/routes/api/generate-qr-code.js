import qrcode from 'qr.js'
import { ADMIN_PSWD } from '$lib/env';
import { updateUniqueCode, uid } from './_util';

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
