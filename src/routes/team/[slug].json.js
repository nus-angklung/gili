// @ts-ignore
import { parseSlug } from '$lib/util';
import teams from './_teams.js';

const years = Object.keys(teams);

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function get({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const slug = parseSlug(params.slug)

    if (years.includes(slug)) {
        return {
            body: {
                year: years[years.indexOf(slug)],
                team: teams[slug],
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
