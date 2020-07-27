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

        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .container p {
        text-align: center;
    }

    .profile {
        padding: 1rem;
        margin: 1rem;
        width: 250px;
        font-size: 1.5rem;
        border: 1px solid gray;
    }

    .profile img {
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
        display: block;
        width: 200px;
        height: 200px;
    }

    .navigation {
        margin: 3rem 2rem 0;
    }

    .navigation .left {
        float: left;
    }

    .navigation .right {
        float: right;
    }

    @media (max-width: 576px) {
        .navigation .left,
        .navigation .right {
            float: none;
            display: block;
            text-align: center;
            margin: 1rem;
        }
    }

    .navigation-button {
        border: solid 2px white;
        padding: 10px;
        margin: 0 4px 4px 4px;
        border-radius: 10px;
        background-color: black;
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
    }

    .navigation::after {
        content: '';
        display: block;
        clear: both;
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

<h3>Executive Committee</h3>
<ul class="container">
    {#each team as member}
        <li class="profile">
            <img
                src={get_image_source(member.img)}
                alt="{member.name} profile photo" />
            <p>{member.name}</p>
            <p>{member.position}</p>
        </li>
    {/each}
</ul>

<div class="navigation">
    {#if Number(year) > first_year}
        <a class="navigation-button left" href="team/{Number(year) - 1}">
            Previous year
        </a>
    {/if}

    {#if Number(year) < current_year}
        <a class="navigation-button right" href="team/{Number(year) + 1}">
            Next year
        </a>
    {/if}
</div>
