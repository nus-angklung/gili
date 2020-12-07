// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_news.js` rather than `news.js`, because
// we don't want to create an `/blog/teams` route — the leading
// underscore tells Sapper not to do that.

const news = {
    '13-11-2020': {
	title: 'ABC',
	date: Date(2020, 11, 13),
	img: 'angklung.jpg',
	body: '##############################################################'
    },
    '25-10-2020': {
	title: 'DEF',
	date: Date(2020, 10, 25),
	img: 'sasando.jpg',
	body: '##############################################################'
    },
    '7-9-2020': {
	title: 'GHI',
	date: Date(2020, 9, 7),
	img: 'kolintang.jpg',
	body: '##############################################################'
    }
};

export default news;
