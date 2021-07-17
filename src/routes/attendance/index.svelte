<script>
    import { onMount } from 'svelte';

    onMount(() => {
        if (window.localStorage.getItem('name')) {
            document.querySelector('#name').value =
                window.localStorage.getItem('name');
            document.querySelector('#nusnet').value =
                window.localStorage.getItem('nusnet');
        }

        document.querySelector('#form').addEventListener('submit', (event) => {
            window.localStorage.setItem(
                'name',
                document.querySelector('#name').value
            );
            window.localStorage.setItem(
                'nusnet',
                document.querySelector('#nusnet').value
            );
        });
    });

    async function submitHandler() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const name = document.querySelector('#name').value;
        const nusnet = document.querySelector('#nusnet').value;

        await fetch(
            '/js/update-attendance?' +
                'code=' +
                code +
                '&name=' +
                name +
                '&nusnet=' +
                nusnet
        ).then((response) => {
            if (response.status == 200) {
                window.location.replace('/attendance/success');
            } else {
                response.text().then((message) => alert(message));
            }
        });
    }
</script>

<div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
    <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Angklung Check-In
        </h2>
        <div>
            <form
                on:submit|preventDefault={submitHandler}
                id="form"
                class="mt-8 space-y-6"
            >
                <div>
                    <label class="sr-only" for="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <label class="sr-only" for="nusnet">NUSNET</label>
                    <input
                        type="text"
                        id="nusnet"
                        name="nusnet"
                        placeholder="NUSNET id"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Check in
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
