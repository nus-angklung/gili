<script context="module">
    let current;
</script>

<script>
    // The console log lines are commented on purpose and not removed for easier debugging matters.

    export let audioData;

    import TrackHeading from './TrackHeading.svelte';
    import ProgressBarTime from './ProgressBarTime.svelte';
    import ProgressBarSlider from './ProgressBarSlider.svelte';
    import AudioControls from './AudioControls.svelte';
    import VolumeSlider from './VolumeSlider.svelte';
    import Playlist from './Playlist.svelte';
    import KeyboardShortcut from './KeyboardShortcut.js';
    import { onMount } from 'svelte';

    let duration;
    let currentTime = 0;
    let isPaused = true;
    let ended;
    let volume = 0.5;
    $: muted = volume == 0;
    let audio;

    const shortcut = {
        ArrowLeft: (e) => (currentTime -= 4), // actually shifts for 5 seconds but we got 1 extra from the default setting
        ArrowRight: (e) => (currentTime += 4),
    };

    function stopOthers() {
        if (current && current !== audio) current.pause();
        current = audio;
    }

    // Get Audio track
    let trackIndex = 0;
    // $: console.log(trackIndex)
    let currentAudioLink = audioData[trackIndex].link;
    let trackTitle = audioData[trackIndex].name;
    let trackNo = trackIndex + 1;

    const loadTrack = () => {
        // $: console.log(`loaded = ${trackIndex}`);
        // $: console.log(`ct = ${audio.currentTime}`);
        currentAudioLink = audioData[trackIndex].link;
        trackTitle = audioData[trackIndex].name;
        trackNo = trackIndex + 1;
    };

    const playNextTrack = () => {
        if (trackIndex < audioData.length - 1) {
            trackIndex += 1;
            loadTrack();
            audio.src = currentAudioLink;
            // $: console.log(`audio = ${audio.src}`);
            // $: console.log(`dataset = ${trackIndex}`);
            audio.play();
            isPaused = false;
        } else if (trackIndex == audioData.length - 1) {
            audio.pause();
            isPaused = true;
            ended = true;
        }
    };

    // Track Duration and Progress Bar
    let totalTimeDisplay = 'waiting...';
    let currTimeDisplay = '⏱ 00:00';
    let trackTimer;
    updateTime();

    function updateTime() {
        let currMins = Math.floor(currentTime / 60);
        let currSecs = Math.floor(currentTime - currMins * 60);
        let currHours = Math.floor(currentTime / 3600);

        let durMins = Math.floor(duration / 60);
        let durSecs = Math.floor(duration - durMins * 60);
        let durHours = Math.floor(duration / 3600);

        if (currSecs < 10) currSecs = `0${currSecs}`;
        if (durSecs < 10) durSecs = `0${durSecs}`;
        if (currMins < 10) currMins = `0${currMins}`;
        if (durMins < 10) durMins = `0${durMins}`;

        if (currHours == 0) currTimeDisplay = `⏱ ${currMins}:${currSecs}`;
        if (durHours == 0) totalTimeDisplay = `${durMins}:${durSecs} ⏱`;

        if (currHours > 0)
            currTimeDisplay = `⏱ ${currHours}:${currMins}:${currSecs}`;
        if (durHours > 0)
            totalTimeDisplay = `${durHours}:${durMins}:${durSecs} ⏱`;

        if (ended) {
            toggleTimeRunning();
            playNextTrack();
            updateTimeV2();
        }
    }

    function updateTimeV2() {
        let currMins = Math.floor(audio.currentTime / 60);
        let currSecs = Math.floor(audio.currentTime - currMins * 60);
        let currHours = Math.floor(audio.currentTime / 3600);

        let durMins = Math.floor(audio.duration / 60);
        let durSecs = Math.floor(audio.duration - durMins * 60);
        let durHours = Math.floor(audio.duration / 3600);

        if (currSecs < 10) currSecs = `0${currSecs}`;
        if (durSecs < 10) durSecs = `0${durSecs}`;
        if (currMins < 10) currMins = `0${currMins}`;
        if (durMins < 10) durMins = `0${durMins}`;

        if (currHours == 0) currTimeDisplay = `⏱ ${currMins}:${currSecs}`;
        if (durHours == 0) totalTimeDisplay = `${durMins}:${durSecs} ⏱`;

        if (currHours > 0)
            currTimeDisplay = `⏱ ${currHours}:${currMins}:${currSecs}`;
        if (durHours > 0)
            totalTimeDisplay = `${durHours}:${durMins}:${durSecs} ⏱`;
    }

    const toggleTimeRunning = () => {
        if (ended && trackIndex < audioData.length - 1) {
            isPaused = true;
            clearInterval(trackTimer);
            // $: console.log(`Ended = ${ended}`);
        } else if (ended) {
            // this separation somehow works on handling end of playlist, so we just keep it that way
            isPaused = true;
            clearInterval(trackTimer);
            // $: console.log(`Ended = ${ended}`);
        } else {
            trackTimer = setInterval(updateTime, 100);
        }
    };

    // Controls
    // $: console.log(`isPaused = ${isPaused}`);

    const playPauseAudio = () => {
        if (audio.paused) {
            toggleTimeRunning();
            audio.play();
            isPaused = false;
        } else {
            toggleTimeRunning();
            audio.pause();
            isPaused = true;
        }
    };

    const rewindAudio = () => (currentTime -= 10);
    const forwardAudio = () => (currentTime += 10);

    // Volume Slider
    const muteUnmuteAudio = () => {
        if (muted) {
            // I just reassign both to ensure safety :-)
            volume = 0.1;
            audio.volume = 0.1;
        } else {
            volume = 0;
        }
    };

    // $: console.log(`muted = ${muted}`);

    // Playlist
    const handleTrack = (e) => {
        if (isPaused) {
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            audio.src = currentAudioLink;
            // $: console.log(`audio = ${audio.src}`);
            // $: console.log(`dataset = ${trackIndex}`);
            playPauseAudio();
        } else {
            isPaused = true;
            trackIndex = Number(e.target.dataset.trackId);
            loadTrack();
            audio.src = currentAudioLink;
            // $: console.log(`audio = ${audio.src}`);
            // $: console.log(`dataset = ${trackIndex}`);
            playPauseAudio();
        }
    };

    onMount(() => {
        updateTimeV2();
        toggleTimeRunning();
    });
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

<audio
    id="songPlaying"
    src={currentAudioLink}
    bind:duration
    bind:currentTime
    bind:ended
    bind:volume
    bind:this={audio} />

<div style="background-color:#333333;padding:30px;">
    <div class="pl-header-container">
        <div class="box-profile-picture">
            <center>
                <img
                    class="profile"
                    src="client/team/2020/yehezkiel.jpg"
                    alt="PP Playlist" />
            </center>
        </div>

        <div class="box-audio-player">
            <TrackHeading {trackNo} {trackTitle} />
            <center>
                <ProgressBarTime {currTimeDisplay} {totalTimeDisplay} />

                {#if duration}
                    <div use:KeyboardShortcut={{ shortcut }}>
                        <ProgressBarSlider
                            max={duration}
                            min={0}
                            step={duration / 250}
                            current={currentTime}
                            on:change={(e) => (currentTime = e.detail.value)}
                            on:input={toggleTimeRunning} />
                    </div>
                {/if}

                <AudioControls
                    {isPaused}
                    on:rewind={rewindAudio}
                    on:playPause={playPauseAudio}
                    on:forward={forwardAudio} />

                <VolumeSlider
                    max={1}
                    min={0}
                    step={0.01}
                    current={volume}
                    {muted}
                    on:muteUnmute={muteUnmuteAudio}
                    on:change={(e) => (volume = e.detail.value)} />
            </center>
            <br />
        </div>
    </div>

    <Playlist on:click={handleTrack} />
</div>
