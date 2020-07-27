<style>
    .social {
        display: flex;
        justify-content: center;
        flex-flow: row wrap;
    }

    .social a {
        padding: 1rem;
    }

    .social a img {
        width: 100px;
    }
</style>

<svelte:head>
    <title>Contact us</title>
</svelte:head>
<center>
    <h1>Find us at our social media!</h1>
</center>

<div class="social">
    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/NUSAngklung">
        <img src="client/contact/facebook.svg" />
    </a>

    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/channel/UC86Z1UcM82LOKvlS2HyQZSg">
        <img src="client/contact/youtube.svg" />
    </a>

    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/nusangklung">
        <img src="client/contact/instagram.svg" />
    </a>
</div>
