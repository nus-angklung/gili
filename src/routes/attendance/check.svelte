<script context="module">

    export async function load({ page, fetch }) {

        let url = '/api/check-script'
        const res = await fetch(url);
        const data = await res.json();

        let names = []
        for (let page of data.results) {
            const name = page.properties.name;
            if (name.rich_text.length > 0) {
                names.push(name.rich_text[0].plain_text)
            }
        }

        console.log(names)
        return {
            props: {
                currDate: data.message,
                names,
            }
        };
    }
</script>

<script>
    export let currDate
    export let names = [];
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
    h3 {
        color: beige;
        font-size: 2em;
        text-align: center;
    }
    .spacer {
        height: 20px;
    }
</style>

<svelte:head>
    <title>Check</title>
</svelte:head>

<h3>List of Attendees</h3>

<div class="spacer" />

<h3>Today is: {currDate}</h3>
<hr />

<ul class="container">
    {#each names as name}
        {name}
        <br/>
    {/each}
</ul>

<div>
    Hello guys, whats up
</div>


