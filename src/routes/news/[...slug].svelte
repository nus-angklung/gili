<script context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    import newsTargets from 'news-targets';
    import { parseSlug } from '$lib/util'
    export async function load({ page, fetch }) {
        const slug = parseSlug(page.params.slug)
        // the `slug` parameter is available because
        // slug is meant to be the part of a URL which identifies a particular page on a website.
        const url = `${slug}.json`
        const res = await fetch(url);
        const data = await res.json();
        // This if-else statement is used to make sure that 
        // the web page can be displayed (redirect status of 200). 
        // Otherwise, an error message will be displayed.
        if (res.status != 200) {
            return {
                status: res.status,
                error: new Error(`Could not load: ${url}. Got: ${data.message}`)
            };
        }
        // if title exists, try to find news with matching title. 
        // Otherwise, the first title will be used.
        // TODO: current support for multiple articles with same date is still hacky
        let news = (data.title && data.news.find((news) => news.title == data.title)) ||
            data.news[0];
        // get the content
        // https://github.com/rollup/rollup/issues/2463#issuecomment-455957865
        news.file = await newsTargets[news.file]().then((x) => x.default);
        return {
            props: {
                news,
                newsIndex: data.newsIndex,
            }
        };
    }
</script>
<script>
    import { dates } from './_news.js';
    export let newsIndex;
    export let news = {};
    const default_picture = '/client/news/default-picture.svg';
    // convert image slug (if any) into image source or return a default source.
    function get_image_source(image_slug) {
        if (!image_slug) {
            return default_picture;
        }
        return '/client/news/' + dates[newsIndex] + '/' + image_slug;
    }
</script>
<style>
    /* This is used for positioning the buttons in the web page.*/
    .navigation {
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex-flow: row wrap;
    }
    /* This is used to provide the design of the buttons. */
    .navigation-button {
        border: solid 1px white;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        text-decoration: none;
    }
    /* This is used to make sure that the image is centered in the web page. */
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
<br />
<p>Date: {news.displayDate}</p>
<br />
{#each news.file.split("\n\n") as paragraph}
<p>{paragraph}</p>
{/each}
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
