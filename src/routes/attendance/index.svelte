<script>
    import { onMount } from 'svelte';

    let buttonInitialHTML;
    let checkInButton;
    let errorMessage;

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
        startLoadingAnimation();
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const name = document.querySelector('#name').value;
        const nusnet = document.querySelector('#nusnet').value;

        const url = new URL('/api/update-attendance', window.location.origin);
        url.searchParams.append('code', code);
        url.searchParams.append('name', name);
        url.searchParams.append('nusnet', nusnet);

        await fetch(url).then((response) => {
            if (response.status == 200) {
                response
                    .text()
                    .then((location) => window.location.replace(location));
            } else {
                response.text().then((message) => {errorMessage = message});
                stopLoadingAnimation();
            }
        });
    }

    async function startLoadingAnimation() {
        buttonInitialHTML = checkInButton.innerHTML;

        // https://tailwindcss.com/docs/animation
        checkInButton.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating attendance
        `;
        checkInButton.classList.remove("bg-indigo-600");
        checkInButton.classList.remove("hover:bg-indigo-700");
        checkInButton.classList.add("bg-gray-600");
    }

    async function stopLoadingAnimation() {
        checkInButton.innerHTML = buttonInitialHTML;
        checkInButton.classList.remove("bg-gray-600");
        checkInButton.classList.add("bg-indigo-600");
        checkInButton.classList.add("hover:bg-indigo-700");
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
                <p class:hidden={!errorMessage} class="rounded-sm p-1 bg-red-500 text-xl text-white-1000 text-center">{errorMessage}</p>
                <div>
                    <button
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        bind:this={checkInButton}
                    >
                        Check in
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
