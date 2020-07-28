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
        width: 80px;
    }
</style>

<svelte:head>
    <title>Contact us</title>
</svelte:head>
<center>
    <h1>Connect with us!</h1>
</center>

<div class="social">
    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/NUSAngklung">
        <img
            src="client/contact/facebook.svg"
            alt="NUS Angklung Facebook Profile" />
    </a>

    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.youtube.com/channel/UC86Z1UcM82LOKvlS2HyQZSg">
        <img
            src="client/contact/youtube.svg"
            alt="NUS Angklung Youtube Channel" />
    </a>

    <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/nusangklung">
        <img
            src="client/contact/instagram.svg"
            alt="NUS Angklung Instagram Account" />
    </a>
</div>
