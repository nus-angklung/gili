import { Client } from '@notionhq/client';
import { NOTION_API_KEY } from '$lib/env';
const notion = new Client({ auth: NOTION_API_KEY });

let uniqueCode = undefined;

export async function getUniqueCode() {
    if (uniqueCode) return uniqueCode;

    const response = await notion.pages.retrieve({
        page_id: NOTION_QR_CODE_PAGE_ID,
    });
    uniqueCode = response.properties.code.rich_text[0].text.content;
    return uniqueCode;
}

export async function updateUniqueCode(newCode) {
    const date = new Date(); // Date.now()
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // GMT+8. Notion only accept ISO string dates
    const datestring = date.toISOString().slice(0, -1) + '+08:00';

    await notion.pages
        .update({
            page_id: NOTION_QR_CODE_PAGE_ID,
            properties: {
                code: {
                    rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: newCode,
                            },
                        },
                    ],
                },
                lastUpdateTime: {
                    date: {
                        start: datestring, // in SGT
                    },
                },
            },
        })
        .then(() => {
            uniqueCode = newCode;
        });
}

// https://gist.github.com/gordonbrander/2230317#gistcomment-3404537
export function uid() {
    return (
        String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
        Math.random().toString(16).slice(2) +
        Date.now().toString(16).slice(4)
    );
}

export const escapeHtml = (str) => str.replace(/</g, '\\u003c');

export const isValidTimeRange = (datetime) => {
    // Cloudflare getHours return UTC time. + 8 because we are in GMT +8 tz
    const hr = (datetime.getHours() + 8) % 24;
    const min = datetime.getMinutes();
    // 18.30 - 20.59
    if (hr < 18 || hr > 21) return false;
    if (hr == 19 || hr == 20) return true;
    if (min < 30) return false;
};

// only monday and wednesday
export const isValidDay = (datetime) => {
    const day = datetime.getDay();
    return day == 1 || day == 3;
};
