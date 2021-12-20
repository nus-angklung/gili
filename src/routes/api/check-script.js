// @ts-ignore
import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_MEMBERS_DATABASE_ID } from '$lib/env';
const notion = new Client({ auth: NOTION_API_KEY });
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
    let date = new Date().toLocaleDateString('en-GB', {
        timeZone: 'Asia/Singapore',
    });
    const response = await notion.databases.query({
        database_id: NOTION_MEMBERS_DATABASE_ID,
    });

    return {
        status: 200,
        body: {
            date: date,
            results: response.results,
        },
    };
}
