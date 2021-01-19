<script>
    let ytLinks = [
        { year: 2019, link: 'https://www.youtube.com/embed/8JgN5XLcVa8' },
        { year: 2018, link: 'https://www.youtube.com/embed/qVii0353tGo' },
        { year: 2017, link: 'https://www.youtube.com/embed/meyriKmJnU0' },
    ];
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
    @media (min-width: 704px) {
        .container {
            display: flex;
            border: 3px;
            padding: 10px;
            margin: 5px;
            align-content: space-between;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
        .special-container {
            display: flex;
            position: relative;
            border: 3px;
            padding: 15px;
            margin: 20px;
            align-content: space-between;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    }
    .box {
        flex: 1;
        flex-basis: 20%;
        margin: 20px;
    }
    .box-small-margin {
        flex: 1;
        flex-basis: 20%;
        margin: 5px;
    }
    .iframe-container {
        overflow: hidden;
        position: relative;
        margin-bottom: 2em;
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
    p {
        font-size: 15px;
    }
    img {
        width: 30%;
        height: 30%;
        object-fit: contain;
    }
</style>

<!-- <h4>Our Music</h4> -->

<center>
    <h2>
        <b>Our Performances</b>
    </h2>
</center>

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

<center>
    <h2>
        <b>Our Playlist</b>
    </h2>
</center>
<br />
<div class="iframe-container iframe-container-16x9">
    <iframe
        title="Placeholder video for Spotify Playlist"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture"
        allowfullscreen />
</div>

<center>
    <h2>
        <b>Our Instruments</b>
    </h2>
</center>

<div class="special-container">
    <div class="box">
        <center>
            <img src="client/home/angklung-mid.svg" alt="Gambar angklung" />
        </center>
    </div>
    <div class="box">
        <center>
            <h3>
                <b>ANGKLUNG</b>
            </h3>
            <p style="text-align:justify">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat.
            </p>
        </center>
    </div>
</div>

<div class="container">
    <div class="box">
        <div class="box-small-margin">
            <center>
                <img
                    src="client/home/angklung-mid.svg"
                    alt="Gambar kolintang" />
            </center>
        </div>
        <div class="box-small-margin">
            <center>
                <h3>
                    <b>KOLINTANG</b>
                </h3>
                <p style="text-align:justify">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
                </p>
            </center>
        </div>
    </div>

    <div class="box">
        <div class="box-small-margin">
            <center>
                <img src="client/home/angklung-mid.svg" alt="Gambar gendang" />
            </center>
        </div>
        <div class="box-small-margin">
            <center>
                <h3>
                    <b>GENDANG</b>
                </h3>
                <p style="text-align:justify">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
                </p>
            </center>
        </div>
    </div>

    <div class="box">
        <div class="box-small-margin">
            <center>
                <img src="client/home/angklung-mid.svg" alt="Gambar gitar" />
            </center>
        </div>
        <div class="box-small-margin">
            <center>
                <h3>
                    <b>GITAR</b>
                </h3>
                <p style="text-align:justify">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat.
                </p>
            </center>
        </div>
    </div>
</div>
