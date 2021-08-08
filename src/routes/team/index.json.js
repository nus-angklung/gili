import teams from './_teams.js';

const currentExco = teams[Object.keys(teams)[Object.keys(teams).length - 1]];

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function get() {
    return {
        body: {
            team: currentExco,
            year: Object.keys(teams)[Object.keys(teams).length - 1],
        }
    }
}
