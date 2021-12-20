<script context="module">
    let people = []
    let data
    export async function load({ page, fetch }) {
        let url = '/api/check-script'
        const res = await fetch(url);
        data = await res.json();

        // let names = []
        for (let page of data.results) {
            const name = page.properties.name;
            const nusnet = page.properties.nusnet.title[0].plain_text;
            //console.log(nusnet)
            if (name.rich_text.length > 0) {
                people.push({
                    name: name.rich_text[0].plain_text,
                    nusnet: nusnet
                })
            }
        }

        console.log(people)
        console.log(data.results)
        return {
            props: {
                currDate: data.date,
                people,
            }
        };
    }

    async function handleButton(e, person){
        const url = new URL('/api/update-attendance', window.location.origin);
        url.searchParams.append('name', person.name);
        url.searchParams.append('nusnet', person.nusnet);
        await fetch(url).then((response) => {
            if (response.status == 200) {
                console.log("SUCCESS");
            } else {
                response.text().then((message) => {errorMessage = message});
                stopLoadingAnimation();
            }
        });
    }

    // async function submitHandler() {
    //     // const urlParams = new URLSearchParams(window.location.search);
    //     // const code = urlParams.get('code');
    //     // const name = document.querySelector('#name').value;
    //     // const nusnet = document.querySelector('#nusnet').value;

    //     // const url = new URL('/api/update-attendance', window.location.origin);
    //     // url.searchParams.append('code', code);
    //     // url.searchParams.append('name', name);
    //     // url.searchParams.append('nusnet', nusnet);

    //     await fetch(url).then((response) => {
    //         if (response.status == 200) {
    //             response
    //                 .text()
    //                 .then((location) => window.location.replace(location));
    //         } else {
    //             response.text().then((message) => {errorMessage = message});
    //             stopLoadingAnimation();
    //         }
    //     });
    // }

    
</script>

<script>
    export let currDate
    export let people = [];
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
    {#each people as person}
        <li class="container"> 
            {person.name} : <button on:click={(e) => (handleButton(e, person))} class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Press this
                    </button>
        </li>
        <br/>
    {/each}
</ul>

<div>
    Hello guys, whats up
</div>


