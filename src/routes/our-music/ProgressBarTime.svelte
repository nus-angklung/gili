<script>
    export let currTimeDisplay;
    export let totalTimeDisplay;
</script>

<style>
    #time {
        display: flex;
        justify-content: space-between;
    }
</style>

<div id="time">
    <span id="progress-time">{currTimeDisplay}</span>
    <span id="track-duration">{totalTimeDisplay}</span>
</div>
