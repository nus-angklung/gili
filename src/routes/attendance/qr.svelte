<script>
    let password = '';

    const fetchAndDisplayQR = async () => {
        let cells;

        await fetch('/js/generate-qr-code?pwd=' + password)
            .then((response) => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    response.text().then((message) => alert(message));
                    return;
                }
            })
            .then((data) => (cells = data.cells));

        const width = 320;
        const height = 320;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        const tileW = width / cells.length;
        const tileH = height / cells.length;

        for (let r = 0; r < cells.length; ++r) {
            const row = cells[r];
            for (let c = 0; c < row.length; ++c) {
                ctx.fillStyle = row[c] ? '#000' : '#fff';
                const w = Math.ceil((c + 1) * tileW) - Math.floor(c * tileW);
                const h = Math.ceil((r + 1) * tileH) - Math.floor(r * tileH);
                ctx.fillRect(
                    Math.round(c * tileW),
                    Math.round(r * tileH),
                    w,
                    h
                );
            }
        }

        // Remove login page and add the canvas
        var elem = document.querySelector('#login');
        elem.parentNode.removeChild(elem);
        document.querySelector('#qr').appendChild(canvas);
    };
</script>

<div
    id="qr"
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
    <div id="login">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            👀
        </h2>
        <div>
            <form
                on:submit|preventDefault={fetchAndDisplayQR}
                class="mt-8 space-y-6"
                method="get"
            >
                <div>
                    <label class="sr-only" for="pswd">Password</label>
                    <input
                        type="password"
                        autocomplete="password"
                        bind:value={password}
                        id="pswd"
                        name="pswd"
                        required
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
