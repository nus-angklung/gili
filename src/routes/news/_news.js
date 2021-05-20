// Dates must be in format YYYY-MM-DD
// title must be unique within same date

const newsList = [
    {
        title:
            'COVID-19 restriction: NUSAE 2020/2021 always seeks for the alternatives',
        file:
            'covid-19-arrangement-nusae-always-seeks-for-the-alternatives.txt',
        img: 'imagined_concert.png',
        img_name: 'Imagined concert',
        date: '2021-05-09',
    },
];

const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// The transform function below is useful to sort all of the news
// from the newest to the oldest by their dates.

const transform = (newsList) => {
    const adaptedNewsList = {};

    for (let news of newsList) {
        // sanity check if date exists and date follows YYYY-MM-DD format.
        if (!news.date || !news.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
            throw Error('Date format must be in YYYY-MM-DD format');
        }

        const [year, month, date] = news.date.split('-').map(Number);

        // sanity date checking
        if (month < 1 || month > 12 || date < 0 || date > 31) {
            throw Error(`Invalid date ${news.date}`);
        }

        news.displayDate = `${date} ${monthList[month - 1]} ${year}`;
        let datesWithoutSeparator = news.date.replace(/-/g, '');
        // create key datesWithoutSeparator with value [] if not exist, then push a copy of the news
        adaptedNewsList[datesWithoutSeparator] =
            adaptedNewsList[datesWithoutSeparator] || [];
        adaptedNewsList[datesWithoutSeparator].push({ ...news });
    }

    // take the dates then sort from newest to oldest
    const dates = Object.keys(adaptedNewsList).sort((a, b) => (b > a ? 1 : -1));
    return { dates, news: adaptedNewsList };
};

export const { dates, news } = transform(newsList);
