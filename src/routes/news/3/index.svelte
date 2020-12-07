<style>
    :root {
        text-align: justify;
    }
    h2 {
        color: #f5eccf;
        position: center;
    }
    h2:not(:first-child) {
        margin-top: 3rem;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        row-gap: 2rem;
    }
    .photo {
        padding: 1rem 0;
        margin: auto;
        grid-column: 1 / 2;
    }
    .photo--text {
        position: relative;
        grid-column: 2 / 4;
    }
    .banner {
        width: 100%;
    }
    .photo--text h3 {
        line-height: 56px;
    }
    .photo--text h3::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: var(--highlight);
        display: block;
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
    <title>News 3</title>
</svelte:head>

<h2>ABC</h2>
<img
    src="client/news/3/angklung.jpg"
    class="banner"
    alt="angklung" />
<p>
    Date: 13 November 2020
</p>
<br>
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