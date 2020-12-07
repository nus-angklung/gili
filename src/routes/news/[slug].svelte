<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`new/${params.slug}.json`);
        const data = await res.json();
        if (res.status === 200) {
            return {
                new: data.new,
                code: data.code,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import { current_code, first_code } from './_constants.js';
    export let code;
    export let new = [];
    const default_picture = 'client/team/default-picture.svg';
    // convert image slug (if any) into image source or return a default source.
    function get_image_source(image_slug) {
        if (!image_slug) {
            return default_picture;
        }
        return 'client/news/' + image_slug;
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
</style>

<svelte:head>
    <title>News</title>
</svelte:head>

{#if Number(code) == current_code}
    <h1>Current News ({date})</h1>
{:else}
    <h1>Past News ({date})</h1>
{/if}

<div class="spacer" />

<h3>{title}</h3>
<hr />

        <img
            src={get_image_source(img)}
            alt="{title} photo" />
        <p>{body}</p>


<div class="navigation">
    {#if Number(date) > first_date}
        <a class="navigation-button" href="team/{Number(code) - 1}">
            Previous News
        </a>
    {/if}

    {#if Number(date) < current_date}
        <a class="navigation-button" href="team/{Number(code) + 1}">
            Next News
        </a>
    {/if}
</div>
