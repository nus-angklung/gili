<script>
    const logo = {
        mute: 'client/our-music/mute.svg',
        unmute: 'client/our-music/unmute.svg',
    };

    import { onMount, tick } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let min = 0;
    export let max = 1;
    export let step = 0.01;
    export let current = 0.5;
    export let muted;
    let sliding = false;
    let slider;
    let scale;
    onMount(() => {
        scale = slider.clientWidth / (max / step);
        function handleResize() {
            scale = slider.clientWidth / (max / step);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    $: dispatch('change', { value: current });

    function handleMouseMove(e) {
        if (sliding) {
            const distance = e.clientX - slider.getBoundingClientRect().left;
            const value = Math.round(distance / scale) * step;
            current = Math.max(Math.min(value, max), min);
        }
    }

    async function handleMouseDown(e) {
        sliding = true;

        const distance = e.clientX - slider.getBoundingClientRect().left;
        const value = Math.round(distance / scale) * step;
        current = value;
    }

    function handleKeydown(e) {
        if (e.keyCode === 37) {
            e.preventDefault();
            const nextValue = current - step;
            current = Math.max(nextValue, min);
        } else if (e.keyCode === 39) {
            e.preventDefault();
            const nextValue = current + step;
            current = Math.min(nextValue, max);
        }
    }

    function handleMouseup(e) {
        sliding = false;
    }
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

    .slider {
        position: relative;
        width: 85%;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 5px;
    }

    .rail {
        width: 100%;
        height: 8px;
        background-color: #000000;
        border: 1px solid #888;
        border-radius: 8px;
        overflow: hidden;
    }

    .fill {
        width: 100%;
        height: 8px;
        background-color: #ffffff;
        transform-origin: left;
        transform: scaleX(0);
    }

    .ball {
        position: absolute;
        z-index: 2;
        top: calc(50% - 6.5px);
        left: -3px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: #968482;
    }

    button {
        border: none;
        padding: 0;
        cursor: pointer;
        margin: 0;
        background-color: transparent;
    }
</style>

<svelte:body
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseup}
    on:mouseleave={handleMouseup} />

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

    <div
        tabindex="0"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={current}
        aria-orientation="horizontal"
        role="slider"
        bind:this={slider}
        class="slider"
        on:mousedown={handleMouseDown}
        on:keydown={handleKeydown}>
        <div class="rail">
            <div
                class="ball"
                style="left: calc({(current / max) * 100}% - 6.5px)" />

            <div class="fill" style="transform: scaleX({current / max})" />
        </div>
    </div>

    <label for="vol-slider" style="text-align:right">
        {Math.floor(current * 100)}
    </label>
</div>
