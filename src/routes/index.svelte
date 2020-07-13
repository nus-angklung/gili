<style>
    .navigation-button {
        border: solid 2px white;
        padding: 10px;
        margin: 0 4px 4px 4px;
        border-radius: 10px;
        background-color: black;
        color: white;
    }

    .angklung-logo {
        width: 100%;
        padding-top: 100px;
    }

    .angklung-logo img {
        float: right;
        margin-right: 2%;
        margin-left: 2%;
    }

    .big-angklung {
        position: relative;
        bottom: 25vh;
    }

    .mid-angklung {
        position: relative;
        bottom: 12.5vh;
    }

    .angklung-logo::after {
        content: '';
        display: block;
        clear: both;
    }
</style>

<svelte:head>
    <title>NUS Angklung Ensemble</title>
</svelte:head>

<img src="/homepage/header.svg" width="50%" />
<br />
<p>Listen to the sound of Nusantara</p>
<button class="navigation-button">Join Us Now</button>
<button class="navigation-button">Learn To Play</button>
<br />
<div class="angklung-logo">
    <img class="big-angklung" src="/homepage/angklung-large.svg" width="20%" />
    <img class="mid-angklung" src="/homepage/angklung-mid.svg" width="18%" />
    <img src="/homepage/angklung-small.svg" width="16%" />
</div>
