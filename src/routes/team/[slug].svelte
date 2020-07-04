<script context="module">
    export async function preload({ params, query }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const res = await this.fetch(`team/${params.slug}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return {
                team: data.team,
                last: data.last,
                year: data.year,
            };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let team = [];
    export let year;
    let last;
</script>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>

<svelte:head>
    <title>Team</title>
</svelte:head>

<h1>Our Ensemble (AY {year} / {Number(year) + 1})</h1>
<h3>Executive Committee</h3>
<ul>
    {#each team as member}
    <li>{member.position} : {member.name}</li>
    {/each}
</ul>

{#if !last}
<a href="team/{Number(year) + 1}">Next year</a>
{/if} {#if Number(year) > 2007}
<a href="team/{Number(year) - 1}">Previous year</a>
{/if}
