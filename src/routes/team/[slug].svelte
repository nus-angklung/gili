<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`team/${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return {
                team: data.team,
                secondLast: data.secondLast,
                year: data.year,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import * as constants from './_constants.js';
    export let team = [];
    export let year;
    export let secondLast;
</script>

<style>
    .container {
        margin: 0 0 1em 0;
        line-height: 1.5;
        list-style-type: none;

        display: flex;
        flex-flow: row wrap;
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

{#if Number(year) == constants.current_year}
    <h1>Current Ensemble</h1>
{:else}
    <h1>Past Ensemble ({year} / {Number(year) + 1})</h1>
{/if}

<h3>Executive Committee</h3>
<ul class="container">
    {#each team as member}
        <li class="profile">
            <img src="client/team/default-picture.svg" width="100px" />
            <p>{member.name}</p>
            <p>{member.position}</p>
        </li>
    {/each}
</ul>

<div class="navigation">
    {#if Number(year) > constants.first_year}
        <a class="navigation-button left" href="team/{Number(year) - 1}">
            Previous year
        </a>
    {/if}

    {#if Number(year) < constants.current_year}
        <a class="navigation-button right" href="team/{Number(year) + 1}">
            Next year
        </a>
    {/if}
</div>
