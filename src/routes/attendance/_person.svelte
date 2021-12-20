<script>
    export let name;
    export let nusnet;
    export let dates;
    const currDate = (new Date()).toLocaleDateString('en-GB', {
        timeZone: 'Asia/Singapore',
    });
    function checkAttendToday(person) {
        return dates.includes(currDate);
    }
    async function handleButton() {
        let errorMessage;
        const url = new URL('/api/update-attendance', window.location.origin);
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ name, nusnet })
        }).then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                dates = [...dates, currDate];
                console.log("successfully updating...", { name, nusnet, dates })
                return dates
            } else {
                response.text().then((message) => { errorMessage = message });
                return Error(errorMessage)
            }
        });
    }
    let promise = Promise.resolve(dates)
    function handleSubmit() {
        promise = handleButton()
    }
</script>

<div class="h-48 text-3xl">
    {#await promise}
    <p class="bg-gray-500 text-black-700 font-semibold py-2 px-4 h-full w-full rounded text-xl flex place-items-center">
        Loading...</p>
    {:then dates}
    {#if checkAttendToday(dates)}
    <div on:click="{handleSubmit}"
        class="bg-green-500 text-white py-2 px-4 rounded h-full w-full flex place-items-center">
        {name}
    </div>
    {:else}
    <div on:click="{handleSubmit}"
        class="bg-red-500 text-white font-semibold py-2 px-4 rounded h-full w-full flex place-items-center">
        {name}
    </div>
    {/if}
    {:catch error}
    <p>Oops! something bad happened! {error}</p>
    {/await}
</div>