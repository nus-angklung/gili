<script>
    import Carousel from './Carousel.svelte';
    import CarouselItem from './CarouselItem.svelte';
    import Paginator from './Paginator.svelte';

    import { content } from './content.js';
    export let visibleindex = 0;
    const default_picture = 'client/news/default-picture.svg';
</script>

<style>
    :root {
        text-align: justify;
    }

    h2 {
        color: #f5eccf;
    }

    h2:not(:first-child) {
        margin-top: 3rem;
    }

    .banner {
        width: 100%;
    }

    p {
        opacity: 0.8;
    }

    /* .photo .hover {
        position: absolute;
        bottom: 10%;
    }

    .photo .hover::after {
        content: '';
        background-color: white;
        opacity: 0.7;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .photo:hover .hover {
        opacity: 1;
    }

    .photo--caption {
        text-align: center;
        width: 100%;
    } */
</style>

<svelte:head>
    <title>About Us</title>
</svelte:head>

<h2>What is Angklung?</h2>

<p>
    Angklung is an idiophone made of several bamboo tubes attached to frames. In
    2010, angklung was included in the list of UNESCO Masterpiece of Oral and
    Intangible Heritage. Not only is angklung popular in its provenance,
    Indonesia, but it is also prevalent in many countries around the world. As
    one angklung only produces a particular note, angklung is commonly played in
    the form of ensemble with each person holding multiple angklungs, making
    collaboration and cooperation the linchpin of a superb and harmonious
    performance. That is why everybody plays a pivotal role in an angklung
    ensemble.
</p>
<h2>About the ensemble</h2>
<img
    src="client/about/angklung-banner.jpg"
    class="banner"
    alt="angklung stage performance banner" />

<p>
    Established in 2007, NUS Angklung Ensemble has reached a greater height as a
    part of NUS Cultural Activity Club (CAC). Its uniqueness has attracted both
    local and international students from all over NUS. Despite our relatively
    young age, we have been invited to perform in a broad range of events within
    and outside NUS such as NUS Arts Festival, NUS Open House InFusion, Temasek
    Foundation Governance and Public Administration Conference, ASEAN Forum, and
    CAC+US.
</p>

<h2 style="text-align: center;">Our Activities</h2>

<Carousel items={content} let:blah bind:visibleindex>
    <CarouselItem {...blah} />
    <Paginator bind:visibleindex items={content} class="flexcenter" />
</Carousel>
