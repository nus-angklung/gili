<script>
    export let min;
    export let max;
    export let step;
    export let current;
    let size = 13;
    let sliderWidth = 85;
    let fillColor = '#d6d9c7';

    // Create dispatcher for the mute-unmute button
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import Slider from './Slider.svelte';

    export let muted;
    const logo = {
        mute: 'client/our-music/mute.svg',
        unmute: 'client/our-music/unmute.svg',
    };
</script>

<style>
    .slidecontainer {
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .slidecontainer label {
        display: flex;
        text-align: center;
    }
    button {
        border: none;
        padding: 0;
        cursor: pointer;
        margin: 0;
        background-color: transparent;
    }
</style>

<div class="slidecontainer">
    <button id="muteUnmute" on:click={() => dispatch('muteUnmute')}>
        <label for="vol-slider">
            <img
                src={muted ? logo.mute : logo.unmute}
                alt="mute"
                height="21px"
                width="21px" />
        </label>
    </button>

    <Slider
        bind:min
        bind:max
        bind:step
        bind:current
        {size}
        {sliderWidth}
        {fillColor} />

    <label for="vol-slider" style="text-align:right">
        {Math.floor(current * 100)}
    </label>
</div>
