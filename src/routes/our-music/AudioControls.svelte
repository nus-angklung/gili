<script>
    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    const icons = {
        play: 'client/our-music/play.svg',
        pause: 'client/our-music/pause.svg',
        rewind: 'client/our-music/rewind.svg',
        fwd: 'client/our-music/forward.svg',
    };

    export let isPaused;
</script>

<style>
    #btn-cont {
        display: flex;
        justify-content: space-between;
    }

    button {
        width: 37px;
        border: none;
        padding: 0;
        cursor: pointer;
        margin: 0;
        background-color: transparent;
    }

    button:active {
        background-color: transparent;
    }

    button img {
        width: 100%;
    }
</style>

<div id="btn-cont">
    <button id="rewind" on:click={() => dispatch('rewind')}>
        <img src={icons.rewind} alt="rewind" />
    </button>
    <button id="play" on:click={() => dispatch('handleControls')}>
        <img src={isPaused ? icons.play : icons.pause} alt="play" />
    </button>
    <button id="forward" on:click={() => dispatch('forward')}>
        <img src={icons.fwd} alt="forward" />
    </button>
</div>
