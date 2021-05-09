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
        margin-bottom: 25px;
    }
    h2:not(:first-child) {
        margin-top: 3rem;
    }
    h3 {
        margin: 15px;
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

<div style="margin-bottom:50px">
    <AudioPlayer {audioData} />
</div>

<center>
    <h2>
        <b>Our Instruments</b>
    </h2>
</center>

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
                As stated in our Ensemble name, Angklung is the main instrument
                of the NUS Angklung Ensemble (a.k.a NUSAE). In a single
                performance, there are usually around 10 to 20 people playing
                Angklung, with each holding up to 3 Angklungs. The number of
                players performing usually influences the complexity of our
                Song's arrangement. To put it simply, the more players we have,
                the more harmonies we can add on.
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
                    Kolintang is another traditional instrument from Indonesia
                    that compliments Angklung Ensemble performance. During our
                    practice session, listening to the Kolintang melodies will
                    help the Angklung players to understand the flow of the
                    songs.
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
                    Gendang is a rhythmic instrument that determines the beat of
                    a performance. Usually, the Gendang player takes the role of
                    an initiator by playing the rhythm for the first 2 bars.
                    That way, the Angklung players can easily remember the
                    song's tempo.
                </p>
            </center>
        </div>
    </div>

    <div class="box">
        <div class="box-small-margin">
            <center>
                <img
                    class="instrument-guitar"
                    src="client/our-music/guitar.svg"
                    alt="Guitar" />
            </center>
        </div>
        <div class="box-small-margin">
            <center>
                <h3>
                    <b>GUITAR</b>
                </h3>
                <p style="text-align:justify">
                    Guitar is a modern instrument that is included in our
                    Ensemble to tone up the performance. Similar to Kolintang,
                    the Guitarists practice alongside our Angklung players to
                    guide us with the song flow in our early practice sessions.
                </p>
            </center>
        </div>
    </div>
</div>
