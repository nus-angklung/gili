<script>
    import { audioData } from './audioData.js';

    let listIsShowing = false;

    const togglePlaylistDisplay = () => (listIsShowing = !listIsShowing);
</script>

<style>
    .playlist-cont {
        box-shadow: 0 0 5px #222;
        border-radius: 0 0 5px 5px;
        background: #333;
    }

    /* Style the buttons that are used to open and close the accordion panel */
    button.accordion {
        background: #222;
        color: #bbb;
        margin: 0;
        padding: 5px 15px;
        width: 100%;
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.4s;
        overflow: hidden;
    }

    /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
    button.active {
        background-color: #888;
        color: black;
    }

    ul {
        list-style-type: none;
        background: #222;
        color: #ddd;
        margin: 0;
        padding: 0;
        border-radius: 0 0 5px 5px;
        height: 0;
        overflow: auto;
        transition: height 0.4s;
    }

    li {
        line-height: 150%;
        padding: 5px 5px 5px 20px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        font-size: 14px;
    }

    li:hover {
        background-color: #444;
    }

    .show-list {
        height: 100%;
    }
</style>

<div class="playlist-cont">
    <button
        class="accordion"
        class:active={listIsShowing}
        on:click={togglePlaylistDisplay}>
        &#9776;
        <b>Playlist</b>
    </button>
    <ul class:show-list={listIsShowing}>
        {#each audioData as { name, link }, i}
            <li data-track-id={i} on:click>▶️ Track {i + 1} : {name}</li>
        {/each}
    </ul>
</div>
