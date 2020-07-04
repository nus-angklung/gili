<script>
    export let segment;
</script>

<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }
</style>

<nav>
    <ul>
        <li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">Home</a></li>
        <li><a aria-current="{segment === 'our-ensemble' ? 'page' : undefined}" href="our-ensemble">Our Ensemble</a></li>
        <li><a aria-current="{segment === 'our-music' ? 'page' : undefined}" href="our-music">Our Music</a></li>
        <li><a aria-current="{segment === 'contact-us' ? 'page' : undefined}" href="contact-us">Contact Us</a></li>
        <!--TODO: set team under our ensemble-->
        <li><a aria-current="{segment === 'team' ? 'page' : undefined}" href="team">Team</a></li>
    </ul>
</nav>
