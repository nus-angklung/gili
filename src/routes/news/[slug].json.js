import { news, dates } from './_news.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { slug } = params;
    if (dates.includes(slug)) {
        return {
            body: {
                news: news[slug],
                newsIndex: dates.indexOf(slug),
            }
        }
    } else {
        return {
            status: 404, 
            body: {
                message: 'Not Found'
            }
        };
    }
}
