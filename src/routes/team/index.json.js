import teams from './_teams.js';

const currentExco = teams[Object.keys(teams)[Object.keys(teams).length - 1]];

export function get(req, res) {
    res.set({
        'Content-Type': 'application/json',
    });

    res.json({
        team: currentExco,
        year: Object.keys(teams)[Object.keys(teams).length - 1],
    });
}
