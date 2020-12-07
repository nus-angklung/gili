import news from './_news.js';

const dates = Object.keys(news);

export function get(req, res, next) {
    // the `slug` parameter is available because
    // this file is called [slug].json.js
    const { slug } = req.params;

    if (dates.includes(slug)) {
        res.set({
            'Content-Type': 'application/json',
        });

        res.json({
            date: dates[dates.indexOf(slug)],
            new: news[slug],
        });
    } else {
        res.status(404).json({
            message: 'Not Found',
        });
    }
}