<style>
    :root {
        text-align: justify;
    }
    h2 {
        color: #f5eccf;
        text-align: center;
    }
    .banner {
        width: 100%;
    }
    .navigation {
        display: flex;
        justify-content: center;
        align-items: baseline;
        flex-flow: row wrap;
    }
    .navigation-button {
        border: solid 1px white;
        padding: 0.5rem 1rem;
        margin: 0.5rem;
        border-radius: 5px;
        text-decoration: none;
    }
    p {
        opacity: 0.8;
    }
    .photo img {
        width: 100%;
    }
    a:hover {
        color: tomato;
    }
    @media (max-width: 992px) {
        .photo,
        .photo--text {
            grid-column: 1 / -1;
        }
    }
    /* .photo .hover {
        position: absolute;
        bottom: 10%;
    }
    .photo .hover::after {
        content: '';
        background-color: white;
        opacity: 0.7;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .photo:hover .hover {
        opacity: 1;
    }
    .photo--caption {
        text-align: center;
        width: 100%;
    } */
</style>

<svelte:head>
    <title>News 1</title>
</svelte:head>

<h2>GHI</h2>
<br>
<img
    src="client/news/1/kolintang.jpg"
    class="banner"
    alt="kolintang" />
<p>
    Date: 7 February 2020
</p>
<br>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis neque ac ante lacinia vestibulum. Suspendisse ligula tortor, egestas ac tincidunt nec, finibus vel orci. Maecenas gravida commodo felis ut tincidunt. 

</p>
<br>
<div class="navigation">

        <a class="navigation-button" href="news/2">
            Next news
        </a>
</div>
