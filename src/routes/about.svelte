<style>
    :root {
        text-align: justify;
    }

    h2 {
        color: #f5eccf;
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

    .photo--text p {
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
    <title>About Us</title>
</svelte:head>

<h2>What is Angklung?</h2>

<p>
    Angklung is an idiophone made of several bamboo tubes attached to frames. In
    2010, angklung was included in the list of UNESCO Masterpiece of Oral and
    Intangible Heritage. Not only is angklung popular in its provenance,
    Indonesia, but it is also prevalent in many countries around the world. As
    one angklung only produces a particular note, angklung is commonly played in
    the form of ensemble with each person holding multiple angklungs, making
    collaboration and cooperation the linchpin of a superb and harmonious
    performance. That is why everybody plays a pivotal role in an angklung
    ensemble.
</p>
<h2>About the ensemble</h2>
<img src="about/angklung-banner.jpg" class="banner" />

<p>
    Established in 2007, NUS Angklung Ensemble has reached a greater height as a
    part of NUS Cultural Activity Club (CAC). Its uniqueness has attracted both
    local and international students from all over NUS. Despite our relatively
    young age, we have been invited to perform in a broad range of events within
    and outside NUS such as NUS Arts Festival, NUS Open House InFusion, Temasek
    Foundation Governance and Public Administration Conference, ASEAN Forum, and
    CAC+US.
</p>

<h2>Our Activities</h2>

<div class="grid">
    <div class="photo">
        <img src="about/perform.jpg" alt="Our Performance" />
    </div>
    <div class="photo--text">
        <h3>Our Performance</h3>
        <p>
            We have been holding our annual concert since 2011, having the main
            purpose of showcasing angklung and introducing NUS Angklung Ensemble
            to the NUS community. In our 2015 concert, “The Chronicle”, we
            performed 13 well-known songs spanning diverse eras to take the
            audience in a journey through time. As the biggest concert in the
            history of NUS Angklung Ensemble, “The Chronicle” successfully
            attracted 150 people, including the Education Attaché of the Embassy
            of the Republic of Indonesia in Singapore, Mr. Ismunandar, and the
            manager of NUS Office of Student Affairs, Ms. Lyana Wang Wanzhen.
        </p>
    </div>
    <div class="photo">
        <img src="about/weekly-prac.jpg" alt="Our Weekly Practice" />
    </div>
    <div class="photo--text">
        <h3>Our Weekly Practice</h3>
        <p>
            We have our biweekly practice at NUS CAC Clubroom. The collection of
            songs we play is extensive, ranging from the traditional Indonesian
            songs such as Manuk Dadali and Ayam Den Lapeh, to the modern tunes
            such as Pirates of the Carribean and Winter Games. Apart from that,
            we also organise a musical camp for all members at the end of the
            year to prepare ourselves for the upcoming performances and
            simultaneously build solid ties between the members. While the main
            activities during the camp are practising and reviewing the songs we
            have learnt, a series of exhilarating welfare events, is also held
            so that the members has the chance to get to know each other better.
        </p>
    </div>
    <div class="photo">
        <img src="about/workshop.jpg" alt="Our Workshops" />
    </div>
    <div class="photo--text">
        <h3>Our Workshops</h3>
        <p>
            We conduct annual workshops for external parties keen on learning
            more about angklung. If you’re interested in collaborating with us
            for a workshop, feel free to drop us an
            <a href="mailto:nus.angklung@gmail.com">email</a>
            or contact us using the form below!
        </p>
    </div>
</div>
