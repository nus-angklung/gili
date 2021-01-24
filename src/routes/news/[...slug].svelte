<script context="module">
    import newsTargets from 'news-targets';
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // slug is meant to be the part of a URL which identifies a particular page on a website.
        const [slug, title] = params.slug;
        const res = await this.fetch(`news/${slug}.json`);
        const data = await res.json();
        // This if-else statement is used to make sure that 
        // the web page can be displayed (redirect status of 200). 
        // Otherwise, an error message will be displayed.
        if (res.status === 200) {
            return {
                news,
                number: data.number,
            };
        } else {
            this.error(res.status, data.message);
        }
        // if title exists, try to find news with matching title. 
        // Otherwise, the first title will be used.
        // TODO: current support for multiple articles with same date is still hacky
        let news =
            (title && data.news.find((news) => news.title == title)) ||
            data.news[0];
        // https://github.com/rollup/rollup/issues/2463#issuecomment-455957865
        news.file = await newsTargets[news.file]().then((x) => x.default);
    }
</script>
<script>
    import { dates } from './_news.js';
    export let newsIndex;
    export let news = {};
    const default_picture = 'client/news/default-picture.svg';
    // convert image slug (if any) into image source or return a default source.
    function get_image_source(image_slug) {
        if (!image_slug) {
            return default_picture;
        }
        return 'client/news/' + dates[number] + '/' + image_slug;
    }
</script>
<style>
    // This is used for positioning the buttons in the web page.
    .navigation {
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex-flow: row wrap;
    }
    // This is used to provide the design of the buttons.
    .navigation-button {
        border: solid 1px white;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        text-decoration: none;
    }
    // This is used to make sure that the image is centered in the web page.
    .center_image {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }
</style>
<svelte:head>
    <title>{news.title}</title>
</svelte:head>
<h1 style="text-align: center">{news.title}</h1>
<br />
<img
    src={get_image_source(news.img)}
    alt="{news.img_name} photo"
    class="center_image" />
<p>Date: {news.displayDate}</p>
<br />
<p>{news.file}</p>
<br />
<div class="navigation">
    {#if Number(newsIndex) > 0}
        <a class="navigation-button" href="news/{dates[Number(newsIndex) - 1]}">
            Previous news
        </a>
    {/if}

    {#if Number(newsIndex) < dates.length - 1}
        <a class="navigation-button" href="news/{dates[Number(newsIndex) + 1]}">
            Next news
        </a>
    {/if}
</div>
