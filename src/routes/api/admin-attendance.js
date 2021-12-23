import {
    NOTION_API_KEY,
    DEBUG,
    NOTION_MEMBERS_DATABASE_ID,
    ADMIN_PSWD,
} from '$lib/env';
import { isValidDay, isValidTimeRange } from './_util';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ host, body }) {
    try {
        const successUrl = new URL('/attendance/check', 'http://' + host);

        //get today date
        const now = new Date();
        const currDate = now.toLocaleDateString('en-GB', {
            timeZone: 'Asia/Singapore',
        });

        const { password } = JSON.parse(body);
        if (password !== ADMIN_PSWD) {
            throw new Error('Invalid attempt.');
        }

        //check if its monday or wednesday only
        if (!DEBUG) {
            if (!isValidTimeRange(now) || !isValidDay(now)) {
                return {
                    status: 200,
                    body: successUrl.toString(),
                };
            }
        }

        //add today date to database property
        fetch(
            `https://api.notion.com/v1/databases/${NOTION_MEMBERS_DATABASE_ID}`,
            {
                method: 'PATCH',
                headers: {
                    'Notion-Version': '2021-08-16',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${NOTION_API_KEY}`,
                },
                body: JSON.stringify({
                    properties: {
                        [currDate]: {
                            date: {},
                        },
                    },
                }),
            }
        );

        return {
            status: 200,
            body: successUrl.toString(),
        };
    } catch (err) {
        return {
            status: 401,
            body: 'Error: \n' + err.message,
        };
    }
}
