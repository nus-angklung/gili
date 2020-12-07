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
    @media (max-width: 992px) {
        .photo,
        .photo--text {
            grid-column: 1 / -1;
        }
    }
</style>

<svelte:head>
    <title>News 3</title>
</svelte:head>

<h2>ABC</h2>
<br>
<img
    src="client/news/3/angklung.jpg"
    class="banner"
    alt="angklung" />
<p>
    Date: 13 November 2020
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
            Previous news
        </a>

</div>
