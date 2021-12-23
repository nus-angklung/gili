<script>
    import { onMount } from 'svelte';

    let password;

    let buttonInitialHTML;
    let checkInButton;
    let errorMessage;

    async function submitHandler() {
        startLoadingAnimation();
        const url = new URL('/api/admin-attendance', window.location.origin);

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ password })
        }).then((response) => {
            if (response.status == 200) {
                response
                    .text()
                    .then((location) => window.location.replace(location));
            } else {
                response.text().then((message) => { errorMessage = message });
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

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Angklung Admin Attendance
        </h2>
        <div>
            <form on:submit|preventDefault={submitHandler} id="form" class="mt-8 space-y-6">
                <div>
                    <label class="sr-only" for="pswd">Password</label>
                    <input type="password" autocomplete="password" bind:value={password} id="pswd" name="pswd" required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
                </div>
                <p class:hidden={!errorMessage} class="rounded p-1.5 bg-red-500 text-xl text-white text-center">
                    {errorMessage}</p>
                <div>
                    <button
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        bind:this={checkInButton}>
                        Start Today Attendance
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>