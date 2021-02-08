<script>
    import { onMount, tick } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let min;
    export let max;
    export let step;
    export let current;
    export let size;
    export let sliderWidth;
    export let fillColor;

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

    $: dispatch('changeTime', { value: current });

    export function handleMouseMove(e) {
        if (sliding) {
            const distance = e.clientX - slider.getBoundingClientRect().left;
            const value = Math.round(distance / scale) * step;
            current = Math.max(Math.min(value, max), min);
        }
    }

    export async function handleMouseDown(e) {
        sliding = true;

        const distance = e.clientX - slider.getBoundingClientRect().left;
        const value = Math.round(distance / scale) * step;
        current = value;
    }

    export function handleKeyDown(e) {
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

    export function handleMouseUp(e) {
        sliding = false;
    }
</script>

<style>
    .slider {
        position: relative;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        margin: 0.5rem 0 0.5rem;
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
        transform-origin: left;
        transform: scaleX(0);
    }

    .ball {
        position: absolute;
        z-index: 2;
        left: -3px;
        border-radius: 50%;
        background-color: #968482;
    }
</style>

<div
    tabindex="0"
    aria-valuemax={max}
    aria-valuemin={min}
    aria-valuenow={current}
    aria-orientation="horizontal"
    role="slider"
    bind:this={slider}
    class="slider"
    style="width: {sliderWidth}%"
    on:mousedown={handleMouseDown}
    on:keydown={handleKeyDown}>
    <div class="rail">
        <div
            class="ball"
            style="left: calc({(current / max) * 100}% - {size / 2}px); top:
            calc(50% - {size / 2}px); width: {size}px; height: {size}px" />

        <div
            class="fill"
            style="transform: scaleX({current / max}); background-color: {fillColor}" />
    </div>
</div>
