<script context="module">
    /**
     * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ page }) {
        return {
            props: {
                name: page.query.get('name'),
            },
        };
    }
</script>

<script>
    export let name;
</script>

<div
    class="min-h-screen flex items-center justify-center bg-green-300 py-12 px-4 sm:px-6 lg:px-8"
>
    <h2 class="mt-6 text-center text-xl text-gray-900">
        Thankyou <span class="font-bold">{name}</span> for attending!
    </h2>
</div>
