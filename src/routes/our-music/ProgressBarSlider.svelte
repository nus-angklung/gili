<script>
    export let min;
    export let max;
    export let step;
    export let current;
    let size = 17;
    let sliderWidth = 90;
    let fillColor = '#ffffff';

    import Slider from './Slider.svelte';
</script>

<Slider
    bind:min
    bind:max
    bind:step
    bind:current
    {size}
    {sliderWidth}
    {fillColor} />
