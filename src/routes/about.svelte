<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 0.5rem;
    }

    .photo {
        padding: 0.5rem 0;
    }
    .photo img {
        width: 100%;
    }

    @media (max-width: 576px) {
        .grid {
            grid-template-columns: repeat(1, 1fr);
        }
    }
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

<div class=" grid photos">
    <div class="photo">
        <img src="client/perform.jpg" alt="Our Performance" />
    </div>
    <div class="photo">
        <img src="client/perform.jpg" alt="Our Performance" />
    </div>
    <div class="photo">
        <img src="client/perform.jpg" alt="Our Performance" />
    </div>
</div>

<h3>Our Performance</h3>
<p>
    We have been holding our annual concert since 2011, having the main purpose
    of showcasing angklung and introducing NUS Angklung Ensemble to the NUS
    community. In our 2015 concert, “The Chronicle”, we performed 13 well-known
    songs spanning diverse eras to take the audience in a journey through time.
    As the biggest concert in the history of NUS Angklung Ensemble, “The
    Chronicle” successfully attracted 150 people, including the Education
    Attaché of the Embassy of the Republic of Indonesia in Singapore, Mr.
    Ismunandar, and the manager of NUS Office of Student Affairs, Ms. Lyana Wang
    Wanzhen.
</p>

<h3>Weekly Practice</h3>

<p>
    We have our biweekly practice at NUS CAC Clubroom. The collection of songs
    we play is extensive, ranging from the traditional Indonesian songs such as
    Manuk Dadali and Ayam Den Lapeh, to the modern tunes such as Pirates of the
    Carribean and Winter Games. Apart from that, we also organise a musical camp
    for all members at the end of the year to prepare ourselves for the upcoming
    performances and simultaneously build solid ties between the members. While
    the main activities during the camp are practising and reviewing the songs
    we have learnt, a series of exhilarating welfare events, is also held so
    that the members has the chance to get to know each other better.
</p>

<h3>Workshops</h3>

<p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi,
    obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
    molestias. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga,
    nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ullam
    corrupti minus fuga placeat reiciendis quo? Iste veniam quae, deserunt unde
    rem a mollitia ullam. Nemo incidunt quaerat nostrum quidem.
</p>
