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
        padding: 2rem;
        width: 250px;
        font-size: 1.5rem;
    }

    .profile img {
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>

<svelte:head>
    <title>Team</title>
</svelte:head>

<h1>Past Ensemble ({year} / {Number(year) + 1})</h1>
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

{#if Number(year) > constants.first_year}
    <a href="team/{Number(year) - 1}">Previous year</a>
{/if}
<a href="team/{!secondLast ? Number(year) + 1 : ''}">Next year</a>
