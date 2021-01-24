<script>
    import AudioPlayer from './AudioPlayer.svelte';
    import { audioData } from './audioData.js';
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
        .instrument-container {
            display: flex;
            border: 3px;
            padding: 10px;
            margin: 5px;
            align-content: space-between;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
        }
        .special-container {
            display: flex;
            position: relative;
            border: 3px;
            padding: 8px;
            margin: 7px;
            align-content: space-between;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
        .box {
            flex: 1;
            margin: 18px;
        }
        .box-small-margin {
            flex: 1;
            margin: 5px;
        }
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
    p {
        font-size: 15px;
    }
    .instrument-angklung {
        width: 30%;
        height: 30%;
        object-fit: contain;
    }
    .instrument-kolintang {
        width: 89%;
        height: 89%;
        object-fit: contain;
    }
    .instrument-guitar {
        width: 50%;
        height: 50%;
        object-fit: contain;
    }
    .instrument-gendang {
        width: 41%;
        height: 41%;
        object-fit: contain;
    }
</style>

<!-- <h4>Our Music</h4> -->

<center>
    <h2>
        <b>Our Performances</b>
    </h2>
</center>

<br />

<center>
    <h3>CAC+US Performances</h3>
</center>

<div class="iframe-container iframe-container-16x9">
    <iframe
        title="CAC+US Youtube Playlist"
        width="560"
        height="315"
        src="https://youtube.com/embed/playlist?list=PLac9vFnrjsKMgSrV3XdcHyMKeyX17BP8M"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture"
        allowfullscreen />
</div>

<center>
    <h3>Other Playlist</h3>
</center>

<AudioPlayer {audioData} />

<br />
<br />

<center>
    <h2>
        <b>Our Instruments</b>
    </h2>
</center>

<br />

<div class="special-container">
    <div class="box">
        <center>
            <img
                class="instrument-angklung"
                src="client/home/angklung-mid.svg"
                alt="Angklung" />
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

<div class="instrument-container">
    <div class="box">
        <div class="box-small-margin">
            <center>
                <img
                    class="instrument-kolintang"
                    src="client/our-music/kolintang.svg"
                    alt="Kolintang" />
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
                <img
                    class="instrument-gendang"
                    src="client/our-music/gendang.svg"
                    alt="Gendang" />
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
                <img
                    class="instrument-guitar"
                    src="client/our-music/gitar.svg"
                    alt="Gitar" />
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
