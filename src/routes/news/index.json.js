import news from './news.js';

const currentNews = news[Object.keys(news)[Object.keys(news).length - 1]];

export function get(req, res) {
    res.set({
        'Content-Type': 'application/json',
    });

    res.json({
        breaking_news: currentNews,
        number: Object.keys(news).length - 1,
    });
}
