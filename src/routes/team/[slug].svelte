<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`team/${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return {
                team: data.team,
                year: data.year,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import { current_year, first_year } from './_constants.js';
    export let team = [];
    export let year;

    const default_picture = 'client/team/default-picture.svg';

    // convert image slug (if any) into image source or return a default source.
    function get_image_source(image_slug) {
        if (!image_slug) {
            return default_picture;
        }

        return 'client/team/' + year + '/' + image_slug;
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
    <title>Team</title>
</svelte:head>

{#if Number(year) == current_year}
    <h1>Current Ensemble ({year} / {Number(year) + 1})</h1>
{:else}
    <h1>Past Ensemble ({year} / {Number(year) + 1})</h1>
{/if}

<div class="spacer" />

<h3>Executive Committee</h3>
<hr />

<ul class="container">
    {#each team as member}
        <li class="profile">
            <img
                src={get_image_source(member.img)}
                alt="{member.name} profile photo" />
            <h4>{member.name}</h4>
            <p>{member.position}</p>
        </li>
    {/each}
</ul>

<div class="navigation">
    {#if Number(year) > first_year}
        <a class="navigation-button" href="team/{Number(year) - 1}">
            Previous year
        </a>
    {/if}

    {#if Number(year) < current_year}
        <a class="navigation-button" href="team/{Number(year) + 1}">
            Next year
        </a>
    {/if}
</div>
