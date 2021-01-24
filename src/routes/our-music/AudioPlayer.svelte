<script>
    export let audioData;

    import TrackHeading from './TrackHeading.svelte';
    import ProgressBarTime from './ProgressBarTime.svelte';
    import AudioControls from './AudioControls.svelte';
    import VolumeSlider from './VolumeSlider.svelte';
    import Playlist from './Playlist.svelte';

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
    .profile {
        width: 70%;
        height: 70%;
        object-fit: contain;
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
    }
</style>

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
            <TrackHeading {trackNo} {trackTitle} />
            <center>
                <ProgressBarTime
                    {currTimeDisplay}
                    {totalTimeDisplay}
                    {progress} />

                <AudioControls
                    {isPlaying}
                    on:rewind={rewindAudio}
                    on:playPause={playPauseAudio}
                    on:forward={forwardAudio} />

                <VolumeSlider bind:vol on:input={adjustVol} />
            </center>
            <br />
        </div>
    </div>

    <Playlist on:click={handleTrack} />
</div>
