import teams from './_teams.js';

// all years except current year
const years = Object.keys(teams);
years.pop();

export function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { slug } = req.params;

    if (years.includes(slug)) {
        res.set({
            'Content-Type': 'application/json',
        });

        res.json({
            secondLast: years.indexOf(slug) === years.length - 1, // is second last?
            year: years[years.indexOf(slug)],
            team: teams[slug],
        });
    } else {
        res.status(404).json({
            message: 'Not Found',
        });
    }
}
