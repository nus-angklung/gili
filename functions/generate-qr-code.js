const qrcode = require('qr.js');
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async function(event, context) {
    const generatedUid = uid()
    const urlWithCode =
      'https:' + '//' + event.headers.host + '/attendance/' + generatedUid
    const cells = qrcode(urlWithCode).modules
  
    await updateUniqueCode(generatedUid)
  
    return {
        statusCode: 200,
        body: JSON.stringify({cells: cells}),
      }
  }

async function updateUniqueCode(newCode) {
  await notion.pages.update({
    page_id: process.env.NOTION_QR_CODE_PAGE_ID,
    properties: {
      'code': {
        'rich_text': [
            {
              'text': {
                'content': newCode,
              },
            },
          ],
      },
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
