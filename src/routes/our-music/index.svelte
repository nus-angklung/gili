<script>
    let ytLinks = [
        { year: 2019, link: 'https://www.youtube.com/embed/8JgN5XLcVa8' },
        { year: 2018, link: 'https://www.youtube.com/embed/qVii0353tGo' },
        { year: 2017, link: 'https://www.youtube.com/embed/meyriKmJnU0' },
    ];
</script>

<style>
    .iframe-container {
        overflow: hidden;
        position: relative;
    }

    .iframe-container iframe {
        border: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .iframe-container-16x9 {
        padding-bottom: calc(9 / 16 * 100%);
    }

    .caption {
        text-align: center;
        padding-top: 2em;
    }
</style>

<!-- <h4>Our Music</h4> -->

{#each ytLinks as link}
    <div class="caption">Angklung Performance ({link.year})</div>
    <div class="iframe-container iframe-container-16x9">
        <iframe
            title="Angklung latest stage performance"
            src="{link.link}?rel=0"
            class=""
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture"
            allowfullscreen />
    </div>
{/each}
