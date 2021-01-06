<script context="module">
    import { dates } from './_news.js';
    export function preload({ params, query }) {
        return this.redirect(302, `news/` + dates[0]);
    }
</script>
