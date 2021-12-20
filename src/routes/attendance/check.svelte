<script context="module">
    export async function load({ page, fetch }) {
        let url = '/api/check-script'
        const res = await fetch(url);
        let data = await res.json();
        let people = []
        // let names = []
        for (let page of data.results) {
            const name = page.properties.name;
            const nusnet = page.properties.nusnet
            //console.log(nusnet)
            if (name.rich_text.length > 0) {
                people.push({
                    name: name.rich_text[0].plain_text,
                    nusnet: nusnet.title[0].plain_text,
                    dates: Object.keys(page.properties).filter(x => x.match("^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$"))
                })
            }
        }
        // sort alphabetically to enable easier search
        people.sort((x, y) => x.name < y.name ? -1 : 1);
        console.dir(people)
        return {
            props: {
                currDate: data.date,
                people,
            }
        };
    }
</script>

<script>
    import Person from './_Person.svelte'
    export let currDate
    export let people = []
</script>

<svelte:head>
    <title>Check</title>
</svelte:head>

<h3 class="text-3xl text-center text-white p-4">Attendance on {currDate}</h3>

<div class="h-8" />

<div class="">
    <div class="w-1/2 m-auto grid grid-cols-2 gap-4">
        {#each people as person}
        <Person {...person} />
        {/each}
    </div>
</div>