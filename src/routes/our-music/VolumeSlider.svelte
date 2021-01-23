<script>
    export let vol;

    const mute = {
        logo: 'client/our-music/mute.svg',
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

    /* The slider itself */
    .slider {
        -webkit-appearance: none; /* Override default CSS styles */
        appearance: none;
        width: 550px; /* Full-width */
        height: 3px; /* Specified height */
        margin: 0 10px;
        padding: 0;
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
        transition: opacity 0.2s;
    }

    /* Mouse-over effects */
    .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }

    /* The thumb slider handle */
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 15px; /* Set a specific slider handle width */
        height: 15px; /* Slider handle height */
        border-radius: 50%;
        background: #888; /* Green background */
        cursor: pointer; /* Cursor on hover */
        transition: background 0.2s;
    }

    .slider::-moz-range-thumb {
        width: 15px; /* Set a specific slider handle width */
        height: 15px; /* Slider handle height */
        background: #4caf50; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }
</style>

<div class="slidecontainer">
    <label for="volume-slider">
        <img src={mute.logo} alt="mute" height="21px" width="21px" />
    </label>

    <input
        id="myRange"
        class="slider"
        type="range"
        min="0"
        max="100"
        step="1"
        name="volume"
        bind:value={vol}
        on:input />

    <label for="volume-slider">{vol}</label>
</div>
