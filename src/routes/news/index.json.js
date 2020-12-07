import news from './_news.js';

const currentNews = news[Object.keys(news)[Object.keys(news).length - 1]];

export function get(req, res) {
    res.set({
        'Content-Type': 'application/json',
    });

    res.json({
        team: currentNews,
        code: Object.keys(news)[Object.keys(news).length - 1],
    });
}