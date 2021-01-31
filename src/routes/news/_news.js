// Dates must be in format YYYY-MM-DD
// title must be unique within same date

const newsList = [
    {
        title: 'ABC',
        file: '20200207-a.txt',
        img: 'kolintang.jpg',
        img_name: 'kolintang',
        date: '2020-02-07',
    },
    {
        title: 'DEF',
        file: '20200811.txt',
        img: 'sasando.jpg',
        img_name: 'sasando',
        date: '2020-08-11',
    },
    {
        title: 'GHI',
        file: '20201113.txt',
        img: 'angklung.jpg',
        img_name: 'angklung',
        date: '2020-11-13',
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
        adaptedNewsList[datesWithoutSeparator] = adaptedNewsList[datesWithoutSeparator] || [];
        adaptedNewsList[datesWithoutSeparator].push({ ...news });
    }

    // take the dates then sort from newest to oldest
    const dates = Object.keys(adaptedNewsList).sort((a, b) => (b > a ? 1 : -1));
    return { dates, news: adaptedNewsList };
};

module.exports = transform(newsList);
