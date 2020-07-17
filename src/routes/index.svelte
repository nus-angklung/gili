<style>
    /* header */
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
        padding-top: 15vh;
        padding-bottom: 15vh;
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

    /* body */
    .message {
        width: 50%;
        margin: auto;
        text-align: center;
    }

    .message p {
        margin-top: 5vh;
        font-size: 15px;
        margin-bottom: 10vh;
    }

    .deck {
        width: 75%;
        margin: auto;
        position: relative;

        display: flex;
        justify-content: center;
        flex-flow: row wrap;
    }

    .card {
        width: 300px;
        margin: 20px;
        padding: 25px;
        background-color: rgba(250, 250, 250, 0.2);
    }

    .card p {
        font-size: 15px;
        color: rgba(250, 250, 250, 0.7);
    }

    .card a {
        font-size: 15px;
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

<div class="message">
    <h2>LOREM IPSUM DOLOR SIT AMET</h2>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor,
        egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo
        felis ut tincidunt.
    </p>
</div>

<div class="deck">
    <div class="card">
        <h3>
            <img src="/homepage/music-note.svg" width="23px" />
            OUR MUSIC
        </h3>
        <p>
            We play a diverset set of song, ranging from contemporary to
            traditional songs. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur convallis neque ac ante lacinia
            vestibulum.
        </p>
        <a href="our-music">Learn more about what we play >>></a>
    </div>
    <div class="card">
        <h3>
            <img src="/homepage/music-note.svg" width="23px" />
            OUR ACTIVITIES
        </h3>
        <p>
            We not only practice, we also do good to the community. We do
            workshops for kids. We also perform in the largest student - run
            concert in Singapore, the annual CaCtus.
        </p>
        <a href="/about">More about us >>></a>
    </div>
</div>
