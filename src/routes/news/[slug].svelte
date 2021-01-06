<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`news/${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return {
                breaking_news: data.breaking_news,
                number: data.number,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import { first_number, current_number } from './constants.js';
    import news from './news.js';
    const dates = Object.keys(news);
    export let number;
    export let breaking_news = {};
    const default_picture = 'client/news/default-picture.svg';

    // convert image slug (if any) into image source or return a default source.
    function get_image_source(image_slug) {
        if (!image_slug) {
            return default_picture;
        }

        return 'client/news/' + dates[number] + '/' + image_slug;
    }

    function get_text_source(text_slug) {
        if (!text_slug) {
            return default_picture;
        }

        return 'client/news/' + dates[number] + '/' + text_slug;
    }

    function readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open('GET', file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        };
        rawFile.send(null);
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
    <title>{breaking_news.title}</title>
</svelte:head>

<h1 style="text-align: center">{breaking_news.title}</h1>
<br />
<img
    src={get_image_source(breaking_news.img)}
    alt="{breaking_news.img_name} photo"
    class="center_image" />
<p>Date: {breaking_news.date}</p>
<br />

<p>{breaking_news.file}</p>

<br />

<div class="navigation">
    {#if Number(number) > first_number}
        <a class="navigation-button" href="news/{dates[Number(number) - 1]}">
            Previous news
        </a>
    {/if}

    {#if Number(number) < current_number}
        <a class="navigation-button" href="news/{dates[Number(number) + 1]}">
            Next news
        </a>
    {/if}
</div>
