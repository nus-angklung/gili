<script context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    import { dates } from './_news.js';
    export function load() {
        if (dates.length == 0) {
            return; // will return 404
        }

        return {
            status: 302,
            redirect: `news/${dates[0]}`
        }
    }
</script>
