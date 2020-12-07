<script context="module">
    import { current_date } from './_constants.js';
    export function preload({ params, query }) {
        return this.redirect(302, `new/` + current_date);
    }
</script>