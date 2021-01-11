<script context="module">
    import newsTargets from 'news-targets';

    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const [slug, title] = params.slug;
        const res = await this.fetch(`news/${slug}.json`);
        const data = await res.json();

        // https://github.com/rollup/rollup/issues/2463#issuecomment-455957865
        let news =
            (title && data.news.find((news) => news.title == title)) ||
            data.news[0];
        console.log(news.file);
        news.file = await newsTargets[news.file]().then((x) => x.default);

        if (res.status === 200) {
            return {
                // if title exists, try to find news with matching title. if not found, get the first one
                // TODO: current support for multiple articles with same date is still hacky
                news,
                number: data.number,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import { dates } from './_news.js';
    export let number;
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
    .container {
        line-height: 1.5;
        list-style-type: none;
        padding: 0;

        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .container p {
        text-align: center;
    }

    h3 {
        color: beige;
        font-size: 2em;
        text-align: center;
    }

    .profile {
        padding: 1rem;
        margin: 1rem;
        width: 250px;
        font-size: 1.5rem;
    }

    .profile img {
        border-radius: 50%;
        margin: 0 auto;
        display: block;
        width: 200px;
        height: 200px;
    }

    .profile h4 {
        text-align: center;
        font-weight: 600;
        word-spacing: -0.15rem;
        padding-top: 2rem;
        color: rgba(255, 255, 255, 0.8);
    }

    .profile p {
        color: beige;
        margin: 0.5rem 0;
        font-size: 0.75em;
    }
    .navigation {
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex-flow: row wrap;
    }

    .navigation-button {
        border: solid 1px white;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        text-decoration: none;
    }

    .spacer {
        height: 20px;
    }

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
    {#if Number(number) > 0}
        <a class="navigation-button" href="news/{dates[Number(number) - 1]}">
            Previous news
        </a>
    {/if}

    {#if Number(number) < dates.length - 1}
        <a class="navigation-button" href="news/{dates[Number(number) + 1]}">
            Next news
        </a>
    {/if}
</div>
