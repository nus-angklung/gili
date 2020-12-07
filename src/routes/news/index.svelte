<script context="module">
    import { current_code } from './_constants.js';
    export function preload({ params, query }) {
        return this.redirect(302, `news`);
    }
</script>
