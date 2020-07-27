<script context="module">
    import { current_year } from './_constants.js';

    export function preload({ params, query }) {
        return this.redirect(302, `team/` + current_year);
    }
</script>
