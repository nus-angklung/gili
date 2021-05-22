<script context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    import { current_year } from './_constants.js';
    export function load() {
        return {
            status: 302,
            redirect: `team/${current_year}`
        }
    }
</script>
