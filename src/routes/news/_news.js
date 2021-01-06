// Dates must be in format YYYY-MM-DD
// title must be unique within same date

const newsList = [
    {
        title: 'ABC',
        file:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci.\n Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt.',
        img: 'kolintang.jpg',
        img_name: 'kolintang',
        date: '2020-02-07',
    },
    {
        title: 'DEF',
        file:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci.\n Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt.',
        img: 'sasando.jpg',
        img_name: 'sasando',
        date: '2020-08-11',
    },
    {
        title: 'GHI',
        file:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci.\n Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt.',
        img: 'angklung.jpg',
        img_name: 'angklung',
        date: '2020-11-13',
    },
];

const transform = (newsList) => {
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
        let datesWoSep = news.date.replace(/-/g, '');
        // create key datesWoSep with value [] if not exist, then push a copy of the news
        adaptedNewsList[datesWoSep] = adaptedNewsList[datesWoSep] || [];
        adaptedNewsList[datesWoSep].push({ ...news });
    }

    // take the dates then sort from newest to oldest
    const dates = Object.keys(adaptedNewsList).sort((a, b) => (b > a ? 1 : -1));
    return { dates, news: adaptedNewsList };
};

module.exports = transform(newsList);
