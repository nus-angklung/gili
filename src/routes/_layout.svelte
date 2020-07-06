<script>
    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';

    export let segment;
</script>

<style>
    main {
        max-width: 80%;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
    @media (max-width: 400px) {
        main {
            max-width: 90%;
        }
    }
</style>

<Nav {segment} />

<main>
    <slot />
</main>

<Footer />
