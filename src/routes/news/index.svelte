<script context="module">
    import { current_number } from './constants.js';
    import news from './news.js';
    const dates = Object.keys(news);
    export function preload({ params, query }) {
        return this.redirect(302, `news/` + dates[current_number]);
    }
</script>
