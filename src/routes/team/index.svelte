<script context="module">
    import * as constants from './_constants.js';

    export function preload({ params, query }) {
        return this.redirect(302, `team/` + constants.current_year);
    }
</script>
