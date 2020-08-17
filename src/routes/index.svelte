<style>
    :root {
        --card-bg-color: rgba(250, 250, 250, 0.2);
        --link-highlight: tomato;
    }
    /* header */
    .navigation-button {
        border: solid 2px white;
        padding: 10px;
        margin: 0 4px 4px 4px;
        border-radius: 10px;
        background-color: black;
        color: white;
        text-decoration: none;
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
        padding: 2rem;
        text-align: center;
    }

    .message .tagline {
        font-size: 1.8em;
        font-weight: 600;
        word-spacing: 0;
        font-style: italic;
    }

    .message p {
        padding: 2rem 0;
        max-width: 800px;
        margin: auto;
        opacity: 0.8;
    }

    .message a {
        text-decoration: none;
        display: block;
        font-weight: 500;
        color: var(--link-highlight);
    }

    .message a:hover {
        transform: translateY(-1px);
        transition: ease 0.2s;
    }

    .deck {
        margin: auto;
        padding-top: 2rem;
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
    }

    .card {
        box-sizing: border-box;
        max-width: min(500px, 100%);
        margin: 1em;
        padding: 2.5rem;
        background-color: var(--card-bg-color);
    }

    .card p {
        text-align: left;
        opacity: 0.8;
    }

    .card-title {
        display: flex;
        padding: 0.5rem 0;
    }

    .card-title h3 {
        text-transform: uppercase;
        margin: 0;
        padding-left: 0.75rem;
        font-weight: 600;
        line-height: 50px;
        word-spacing: 0;
    }

    .card-action {
        padding: 1rem 0 0;
        font-weight: 500;
        word-spacing: 0;
        display: flex;
    }

    .card-action svg {
        fill: var(--link-highlight);
        padding: 0 10px;
        height: 20px;
        margin: auto 0;
        transform: translate(-50px, 2px);
        transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
        opacity: 0;
    }

    .card-action:hover svg {
        transform: translate(0, 2px);
        opacity: 1;
    }

    .card-action:hover {
        color: var(--link-highlight);
    }

    .card-action a {
        text-decoration: none;
        background-color: transparent;
    }

    @media (max-width: 576px) {
        .message {
            width: 100%;
            padding: 0;
        }
    }

    @keyframes arrow {
        0% {
            opacity: 0;
        }

        60% {
            opacity: 0.8;
        }

        100% {
            opacity: 1;
        }
    }
</style>

<svelte:head>
    <title>NUS Angklung Ensemble</title>
</svelte:head>

<img src="client/home/header.svg" alt="NUS Angklung Ensemble" width="50%" />
<br />
<p>Listen to the sounds of NUSantara</p>

<a
    target="_blank"
    rel="noopener noreferrer"
    href="https://nus.campuslabs.com/engage/submitter/form/start/424831"
    class="navigation-button">
    Join Us Now
</a>

<br />
<div class="angklung-logo">
    <img
        class="big-angklung"
        src="client/home/angklung-large.svg"
        alt="Angklung-large"
        width="20%" />
    <img
        class="mid-angklung"
        src="client/home/angklung-mid.svg"
        alt="Angklung-mid"
        width="18%" />
    <img
        src="client/home/angklung-small.svg"
        alt="Angklung-small"
        width="16%" />
</div>

<div class="message">
    <h2 class="tagline">Kudu silih asih, silih asah, jeung silih asuh</h2>
    <p>
        Sundanese for “to remind one another, to care for one another, and to
        guide one another” - is the mantra we adhere to. Unity in angklung
        subsequently gives birth to what we call our ensemble as a “famsemble” -
        a portmanteau of family and ensemble.
    </p>
    <a href="vision-mission">Learn more about our vision and mission</a>
</div>

<div class="deck">
    <div class="card">
        <div class="card-title">
            <img src="client/home/music-note.svg" alt="music-note" />
            <h3>Our Music</h3>
        </div>
        <p>
            NUS Angklung Ensemble showcases angklung’s versatility that balances
            traditionality and modernity through performing pieces that cater to
            both traditional interests and current popular trends.
        </p>
        <div class="card-action">
            <a href="our-music">What we play</a>
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 31.49 31.49"
                xml:space="preserve">
                <path
                    d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                    C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                    c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
        </div>
    </div>
    <div class="card">
        <div class="card-title">
            <img src="client/home/music-note.svg" alt="music-note" />
            <h3>Our Activities</h3>
        </div>
        <p>
            Our activities extend beyond merely practicing. We conduct
            activities ranging from internal camps, workshops for
            underprivileged kids, to performing for events such as NUS Cultural
            Activities Club’s annual concert, CACTUS.
        </p>
        <div class="card-action">
            <a href="/about">More about our activities</a>
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 31.49 31.49"
                xml:space="preserve">
                <path
                    d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                    C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                    c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" />
            </svg>
        </div>

    </div>
</div>
