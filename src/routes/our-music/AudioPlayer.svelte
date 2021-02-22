<script>
    // Export audio data for index.svelte
    export let audioData;

    // Import all the svelte files of the player components
    import TrackHeading from './TrackHeading.svelte';
    import ProgressBarTime from './ProgressBarTime.svelte';
    import ProgressBarSlider from './ProgressBarSlider.svelte';
    import AudioControls from './AudioControls.svelte';
    import VolumeSlider from './VolumeSlider.svelte';
    import Playlist from './Playlist.svelte';
    import keyboardShortcut from './keyboardShortcut.js';
    import { onMount } from 'svelte';

    // Set all variables (including muted as a bound variable)
    let duration;
    let currentTime = 0;
    let isPaused = true;
    let ended = false;
    let volume = 0.5;
    let prevVolume = volume;
    $: muted = volume == 0;
    let audio;

    /*
    Keyboard shortcut
    Left arrow rewinds by 5 seconds
    Right arrow forwards by 5 seconds
    */
    const shortcut = {
        ArrowLeft: (e) => (currentTime -= 5),
        ArrowRight: (e) => (currentTime += 5),
    };

    // Get audio track
    let trackIndex = 0;
    let currentAudioLink = audioData[trackIndex].link;
    let trackTitle = audioData[trackIndex].name;
    let trackNo = trackIndex + 1;

    // Update the variables related to audio track
    const loadTrack = () => {
        currentAudioLink = audioData[trackIndex].link;
        trackTitle = audioData[trackIndex].name;
        trackNo = trackIndex + 1;
    };

    // Trigger auto play for the next track
    const playNextTrack = () => {
        if (trackIndex < audioData.length - 1) {
            trackIndex += 1;
        } else {
            // Enable circular autoplay
            trackIndex = 0;
        }
        loadTrack();
        audio.src = currentAudioLink;
        audio.play();
        isPaused = false;
    };

    // Track Duration and Progress Bar
    let totalTimeDisplay = 'waiting...';
    let currTimeDisplay = '⏱ 00:00';
    let trackTimer; // a variable to store the interval from setInterval methods

    /*
    Once loaded, update the time display into the correct parsed form
    To ensure safety, do updateTime instead of just parseTime
    */
    updateTime();

    function parseTime() {
        /*
        Expected display :
        MM:SS       if the audio length is less than one hour
        {H}:MM:SS   if the audio length is 1-hour long or more
        H has the same digits as the literal hour duration
        */

        let currMins = Math.floor(currentTime / 60);
        let currSecs = Math.floor(currentTime % 60);
        let currHours = Math.floor(currentTime / 3600);

        let durMins = Math.floor(duration / 60);
        let durSecs = Math.floor(duration % 60);
        let durHours = Math.floor(duration / 3600);

        // Handle case if at least 1-hour long
        if (currHours > 0) currMins -= currHours * 60;
        if (durHours > 0) durMins -= durHours * 60;

        // Retain 2-digit display for seconds and minutes display
        if (currSecs < 10) currSecs = `0${currSecs}`;
        if (durSecs < 10) durSecs = `0${durSecs}`;
        if (currMins < 10) currMins = `0${currMins}`;
        if (durMins < 10) durMins = `0${durMins}`;

        // Handle final display
        if (currHours == 0) currTimeDisplay = `⏱ ${currMins}:${currSecs}`;
        if (durHours == 0) totalTimeDisplay = `${durMins}:${durSecs} ⏱`;

        if (currHours > 0)
            currTimeDisplay = `⏱ ${currHours}:${currMins}:${currSecs}`;
        if (durHours > 0)
            totalTimeDisplay = `${durHours}:${durMins}:${durSecs} ⏱`;
    }

    function updateTime() {
        /*
        This function mainly focuses on handling the end of audio
        Hence, it's different from just parseTime()
        */
        parseTime();

        // Handles the smooth timer transition from one ended song to another new song
        if (ended) {
            handleTimer();
            playNextTrack();
            parseTime();
        }
    }

    /*
    Handles the timer for the currently playing audio
    Stops timer if the audio has ended
    Keeps updating timer otherwise
    */
    const handleTimer = () => {
        // Wrapper function
        if (ended) {
            stopTimer();
        } else {
            resumeTimer();
        }
    };

    const stopTimer = () => {
        isPaused = true;
        clearInterval(trackTimer);
    };

    const resumeTimer = () => {
        // Update time (check for end of audio too) every 0.1 s = 100 ms
        trackTimer = setInterval(updateTime, 100);
    };

    // Audio Controls, manages the play-pause-resume audio workflow
    const handleAudioControls = () => {
        // Wrapper function
        handleTimer();
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    };

    const playAudio = () => {
        audio.play();
        isPaused = false;
    };

    const pauseAudio = () => {
        audio.pause();
        isPaused = true;
    };

    // Provides two rewind and forward buttons, each by 10 seconds
    const rewindAudio = () => (currentTime -= 10);
    const forwardAudio = () => (currentTime += 10);

    // Volume Slider, handles volume control of the audio
    const muteUnmuteAudio = () => {
        // Wrapper function
        if (muted) {
            unmuteAudio();
        } else {
            muteAudio();
        }
    };

    const unmuteAudio = () => {
        // Brings back the volume to the point before it was muted
        volume = prevVolume;
    };

    const muteAudio = () => {
        // Saves the current volume for unmute later then mutes the audio
        prevVolume = Math.min(volume, 0.5);
        volume = 0;
    };

    // Playlist
    const handlePlaylistTrack = (e) => {
        if (!isPaused) {
            isPaused = true;
        }
        trackIndex = Number(e.target.dataset.trackId);
        loadTrack();
        audio.src = currentAudioLink;
        handleAudioControls();
    };

    onMount(() => {
        parseTime();
        handleTimer();
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
                    <div use:keyboardShortcut={{ shortcut }}>
                        <ProgressBarSlider
                            max={duration}
                            min={0}
                            step={duration / 10000}
                            bind:current={currentTime}
                            on:change={(e) => (currentTime = e.detail.value)}
                            on:input={handleTimer} />
                    </div>
                {/if}

                <AudioControls
                    {isPaused}
                    on:rewind={rewindAudio}
                    on:handleControls={handleAudioControls}
                    on:forward={forwardAudio} />

                <VolumeSlider
                    max={1}
                    min={0}
                    step={0.01}
                    bind:current={volume}
                    {muted}
                    on:muteUnmute={muteUnmuteAudio}
                    on:change={(e) => (volume = e.detail.value)} />
            </center>
        </div>
    </div>

    <Playlist on:click={handlePlaylistTrack} />
</div>
