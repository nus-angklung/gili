<script>
    import { audioData } from './audioData.js';

    import TrackHeading from './TrackHeading.svelte';
    import TrackHeader from './TrackHeader.svelte';
    import ProgressBarTime from './ProgressBarTime.svelte';
    import Controls from './Controls.svelte';
    import VolumeSlider from './VolumeSlider.svelte';
    import PlayList from './PlayList.svelte';

    // Get Audio track
    let trackIndex = 0;
    // $: console.log(trackIndex)
    let audioFile = new Audio(audioData[trackIndex].link);
    audioFile.pause();
    let trackTitle = audioData[trackIndex].name;
    let trackNo = trackIndex + 1;

    const loadTrack = () => {
        audioFile = new Audio(audioData[trackIndex].link);
        audioFile.onloadedmetadata = () => {
            totalTrackTime = audioFile.duration;
            updateTime();
        };
        trackTitle = audioData[trackIndex].name;
        trackNo = trackIndex + 1;
    };

    const autoPlayNextTrack = () => {
        if (trackIndex <= audioData.length - 1) {
            trackIndex += 1;
            loadTrack();
            isPlaying = true;
            audioFile.play();
        } else {
            trackIndex = 0;
            loadTrack();
            isPlaying = true;
            audioFile.play();
        }
    };

    // Track Duration and Progress Bar
    let totalTrackTime;
    $: console.log(totalTrackTime);
    audioFile.onloadedmetadata = () => {
        totalTrackTime = audioFile.duration;
        updateTime();
    };

    let totalTimeDisplay = 'loading...';
    let currTimeDisplay = '0:00';
    let progress = 0;
    let trackTimer;

    function updateTime() {
        progress = audioFile.currentTime * (100 / totalTrackTime);

        let currMins = Math.floor(audioFile.currentTime / 60);
        let currSecs = Math.floor(audioFile.currentTime - currMins * 60);

        let durMins = Math.floor(totalTrackTime / 60);
        let durSecs = Math.floor(totalTrackTime - durMins * 60);

        if (currSecs < 10) currSecs = `0${currSecs}`;
        if (durSecs < 10) durSecs = `0${durSecs}`;
        if (currMins < 10) currMins = `0${currMins}`;
        if (durMins < 10) durMins = `0${durMins}`;

        currTimeDisplay = `⏱ ${currMins}:${currSecs}`;
        totalTimeDisplay = `${durMins}:${durSecs} ⏱`;

        if (audioFile.ended) {
            toggleTimeRunning();
            autoPlayNextTrack();
        }
    }

    const toggleTimeRunning = () => {
        if (audioFile.ended) {
            isPlaying = false;
            clearInterval(trackTimer);
            console.log(`Ended = ${audioFile.ended}`);
        } else {
            trackTimer = setInterval(updateTime, 100);
        }
    };

    // Controls
    let isPlaying = false;
    $: console.log(`isPlaying = ${isPlaying}`);

    const playPauseAudio = () => {
        if (audioFile.paused) {
            toggleTimeRunning();
            audioFile.play();
            isPlaying = true;
        } else {
            toggleTimeRunning();
            audioFile.pause();
            isPlaying = false;
        }
    };

    const rewindAudio = () => (audioFile.currentTime -= 10);
    const forwardAudio = () => (audioFile.currentTime += 10);

    // Volume Slider
    let vol = 50;
    const adjustVol = () => (audioFile.volume = vol / 100);

    // Playlist
    const handleTrack = (e) => {
        if (!isPlaying) {
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); // auto play
        } else {
            isPlaying = false;
            audioFile.pause();
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            playPauseAudio(); // auto play
        }
    };
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
        .pl-header-container {
            display: flex;
            border: 3px;
            padding: 10px;
            margin: 5px;
            align-content: space-between;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
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
    .box-profile-picture {
        flex: 2;
        margin: 5px;
    }
    .box-audio-player {
        flex: 5;
        margin: 5px;
        justify-content: flex-start;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /*.song-container-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        align-content: center;
        font-size: 16px;
        flex-wrap: nowrap;
    }
    .song-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: stretch;
        align-content: center;
        font-size: 14px;
        flex-wrap: nowrap;
        border-bottom-style: solid;
        border-width: 1px;
    }
    .song-box-small {
        flex: 1;
        padding: 6px;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
    }
    .song-box-med {
        flex: 5;
        padding: 6px;
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
    }
    .song-box {
        flex: 11;
        padding: 6px;
        overflow: hidden;
    } */
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
    .instrument-pic {
        width: 30%;
        height: 30%;
        object-fit: contain;
    }
    .profile {
        width: 70%;
        height: 70%;
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

<div style="background-color:#333333;padding:30px;">
    <div class="pl-header-container">
        <div class="box-profile-picture">
            <center>
                <img
                    class="profile"
                    src="client/team/2020/drake.jpg"
                    alt="PP Playlist" />
            </center>
        </div>

        <div class="box-audio-player">
            <TrackHeader {trackNo} />
            <TrackHeading {trackTitle} />
            <center>
                <ProgressBarTime
                    {currTimeDisplay}
                    {totalTimeDisplay}
                    {progress} />

                <Controls
                    {isPlaying}
                    on:rewind={rewindAudio}
                    on:playPause={playPauseAudio}
                    on:forward={forwardAudio} />

                <VolumeSlider bind:vol on:input={adjustVol} />
            </center>
            <br />
        </div>
    </div>

    <PlayList on:click={handleTrack} />
</div>

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
                class="instrument-pic"
                src="client/home/angklung-mid.svg"
                alt="Gambar angklung" />
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
                    class="instrument-pic"
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
                <img
                    class="instrument-pic"
                    src="client/home/angklung-mid.svg"
                    alt="Gambar gendang" />
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
                    class="instrument-pic"
                    src="client/home/angklung-mid.svg"
                    alt="Gambar gitar" />
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
