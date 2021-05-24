//
// modified from: https://github.com/benclmnt/attendsys
//

const qrcode = require('qr.js');

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// DEBUG is an environment variable

const UNIQUE_CODE = '$CODE'
const VALID_KEY = '$VALID_KEY'

async function generateQRCode(event) {
  const generatedUid = uid()
  const urlWithCode =
    'http:' + '//' + event.headers.host + '/' + generatedUid
  console.log(urlWithCode)
  const cells = qrcode(urlWithCode).modules

  const pageId = process.env.NOTION_QR_CODE_PAGE_ID;
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      'code': {
        'rich_text': [
            {
              'text': {
                'content': generatedUid,
              },
            },
          ],
      },
    },
  });

  return {
      statusCode: 200,
      body: qrTemplate(cells),
      headers: { 'content-type': 'text/html' },
  }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
exports.handler = async function(event, context) {

  // setting query parameter post=true as a workaround to avoid using POST
  if (event.queryStringParameters.post != undefined) {
    if (event.path.endsWith('/qr')) {
        return generateQRCode(event)
    }
  }

  if (event.path.endsWith('/qr') || event.path === '/list') {
    return {
        statusCode: 200,
        body: loginTemplate(),
        headers: { 'content-type': 'text/html' },
    }
  }
}

/**
 * Template functions
 */

const escapeHtml = str => str.replace(/</g, '\\u003c')
const template = (body, script = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <link rel="icon" href="https://nusangklung.netlify.app/favicon.jpg">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <title>
        Attendance System
    </title>
</head>
<body>
  ${body}
</body>
${script}
</html>
`

const qrTemplate = cells =>
  template(
    `
<div id="qr" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
</div>
`,
    `
<script>
const width = 320;
const height = 320;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

const cells = ${JSON.stringify(cells)};

const tileW = width  / cells.length;
const tileH = height / cells.length;

for (let r = 0; r < cells.length ; ++r) {
    const row = cells[r];
    for (let c = 0; c < row.length ; ++c) {
        ctx.fillStyle = row[c] ? '#000' : '#fff';
        const w = (Math.ceil((c+1)*tileW) - Math.floor(c*tileW));
        const h = (Math.ceil((r+1)*tileH) - Math.floor(r*tileH));
        ctx.fillRect(Math.round(c*tileW), Math.round(r*tileH), w, h);
    }
}
document.querySelector("#qr").appendChild(canvas);
</script>
  `,
  )

const loginTemplate = () =>
  template(
    `
</form>
<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      👀
    </h2>
  <div>
  <form class="mt-8 space-y-6" method="get">
    <div>
      <label class="sr-only">Password</label>
      <input type="password" autocomplete="password" name="pswd" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      <input type="hidden" name="post" value="true">
    </div>
    <div>
      <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Submit
      </button>
    </div>
  </form>
</div>
`,
  )

/**
 * Util functions
 */

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

function getCookie(request, name) {
  let result = ''
  const cookieString = request.headers.get('Cookie')
  if (cookieString) {
    const cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      const cookiePair = cookie.split('=', 2)
      const cookieName = cookiePair[0].trim()
      if (cookieName === name) {
        const cookieVal = cookiePair[1]
        result = cookieVal
      }
    })
  }
  return result
}

const redirect = location => {
  return new Response(null, {
    status: 302,
    headers: { location },
  })
}
