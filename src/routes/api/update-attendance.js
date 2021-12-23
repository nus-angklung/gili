import { Client } from '@notionhq/client';
import { NOTION_API_KEY, DEBUG, NOTION_MEMBERS_DATABASE_ID } from '$lib/env';
import {
    escapeHtml,
    isValidDay,
    isValidTimeRange,
    getUniqueCode,
} from './_util';
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query, host }) {
    try {
        const now = new Date();

        console.log('Time now: ', now.toISOString());

        if (!DEBUG) {
            if (!isValidTimeRange(now) || !isValidDay(now)) {
                throw new Error('Sorry, currently this service is unavailable');
            }
        }

        const nusnet = escapeHtml(query.get('nusnet')?.toUpperCase());
        const name = escapeHtml(query.get('name'));
        const code = query.get('code');

        console.log(`Attempting to log in ${name} with nusnet ${nusnet}`);

        if (code !== (await getUniqueCode())) {
            throw new Error('Invalid attempt.');
        }

        await markAttendance(nusnet, now);

        // Redirect to /attendance/success?name=${name}
        const successUrl = new URL('/attendance/success', 'http://' + host);
        successUrl.searchParams.append('name', name);

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

export async function post({ body }) {
    try {
        // TODO: Add admin session check

        const now = new Date();
        const { nusnet, name } = JSON.parse(body);

        console.log('Time now: ', now.toISOString());

        if (!DEBUG) {
            if (!isValidTimeRange(now) || !isValidDay(now)) {
                throw new Error('Sorry, currently this service is unavailable');
            }
        }

        console.log(`Attempting to log in ${name} with nusnet ${nusnet}`);

        await markAttendance(nusnet, now);

        return {
            status: 200,
            body: 'success',
        };
    } catch (err) {
        return {
            status: 401,
            body: 'Error: \n' + err.message,
        };
    }
}

async function markAttendance(nusnet, date) {
    // search for the member with given nusnet id
    const response = await notion.databases.query({
        database_id: NOTION_MEMBERS_DATABASE_ID,
        filter: {
            property: 'nusnet',
            text: {
                equals: nusnet,
            },
        },
    });

    if (response.results.length == 0) {
        throw new Error('Invalid nusnet id!');
    }

    const pageId = response.results[0].id;

    const currDate = date.toLocaleDateString('en-GB', {
        timeZone: 'Asia/Singapore',
    }); // "dd/mm/yyyy"
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000); // GMT+8. Notion only accept ISO string dates

    await notion.pages.update({
        page_id: pageId,
        properties: {
            [currDate]: {
                date: {
                    start: date.toISOString().slice(0, -1) + '+08:00', // specify GMT+8 timezone
                },
            },
        },
    });
}
