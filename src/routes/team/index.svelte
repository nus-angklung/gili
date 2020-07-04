<script context="module">
    export function preload({ params, query }) {
        return this.fetch(`team.json`)
            .then((r) => r.json())
            .then((res) => {
                return {
                    team: res.team,
                    year: res.year,
                };
            });
    }
</script>

<script>
    export let team = [];
    export let year;
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

<h1>Current Ensemble</h1>
<h3>Executive Committee</h3>
<ul>
    {#each team as member}
    <li>{member.position} : {member.name}</li>
    {/each}
</ul>
<a href="team/{Number(year) - 1}">Previous year</a>
