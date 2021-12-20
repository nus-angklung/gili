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
        url.searchParams.append('name', name);
        url.searchParams.append('nusnet', nusnet);
        await fetch(url).then((response) => {
            console.log(response.status);
            if (response.status == 200) {
                dates = [...dates, currDate];
                console.log("successfully updating...", { name, nusnet, dates })
                return dates
            } else {
                response.text().then((message) => { errorMessage = message });
                stopLoadingAnimation();
                return Error(errorMessage)
            }
        });
    }

    let promise = Promise.resolve(dates)

    function handleSubmit() {
        promise = handleButton()
    }
</script>

<div class="h-48 text-3xl text-center">
    {#await promise}
    <p class="bg-gray-500 text-black-700 font-semibold py-2 px-4 h-full w-full rounded">Loading...</p>
    {:then dates}
    {#if checkAttendToday(dates)}
    <div on:click="{handleSubmit}"
        class="bg-green-500 text-white py-2 px-4 rounded h-full w-full flex place-items-center">
        <p>{name}</p>
    </div>
    {:else}
    <div on:click="{handleSubmit}"
        class="bg-red-500 text-white font-semibold py-2 px-4 rounded h-full w-full flex place-items-center">
        <p>{name}</p>
    </div>
    {/if}
    {:catch error}
    <p>Oops! something bad happened! {error}</p>
    {/await}
</div>