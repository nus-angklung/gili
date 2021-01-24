<script>
    export let currTimeDisplay;
    export let totalTimeDisplay;
    export let progress;
</script>

<style>
    #time {
        display: flex;
        justify-content: space-between;
    }

    #progress-bar-cont {
        height: 10px;
        margin: 0.5rem 0 0.5rem;
        display: flex;
        align-items: center;
        border: 1px solid #888;
        cursor: pointer;
    }

    #bar {
        height: 10px;
        background-color: #fff;
    }
</style>

<div id="time">
    <span id="progress-time">{currTimeDisplay}</span>
    <span id="track-duration">{totalTimeDisplay}</span>
</div>

<div id="progress-bar-cont">
    <span id="bar" style="width: {progress}%" />
</div>
