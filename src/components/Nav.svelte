<script>
    export let segment;
    const ensembleSubmenu = [
        { resource_path: 'about', display: 'About Us' },
        { resource_path: 'team', display: 'Team' },
        // { resource_path: 'news', display: 'News'}
    ];

    const musicSubmenu = [
        { resource_path: 'our-music', display: 'Performance' },
        { resource_path: 'sheets', display: 'Sheets' },
    ];
    $: isInsideEnsembleSubmenu = ensembleSubmenu.some(
        (submenu) => submenu.resource_path === segment
    );
    $: isInsideMusicSubmenu = musicSubmenu.some(
        (submenu) => submenu.resource_path === segment
    );
</script>

<nav class="container">
    <nav class="navbar">
        <div class="menu"> </div>
        <div class="toggle-button">
            <span class ="bar"></span>
            <span class ="bar"></span>
            <span class ="bar"></span>
        </div>
    </nav>

    <div class="navbar-links">
        <ul>
            <li>
                <a aria-current={segment === '' ? 'page' : undefined} href="/">
                    Home
                </a>
            </li>
            <li class="dropdown">
                <ul class="dropdown-content">
                    {#each ensembleSubmenu as submenu}
                        <li>
                            <a href={'/' + submenu.resource_path}
                                >{submenu.display}</a
                            >
                        </li>
                    {/each}
                </ul>
                <span aria-current={isInsideEnsembleSubmenu ? 'page' : undefined}>
                    Our Ensemble
                </span>
            </li>
            <li class="dropdown">
                <ul class="dropdown-content">
                    {#each musicSubmenu as submenu}
                        <li>
                            <a href={'/' + submenu.resource_path}
                                >{submenu.display}</a
                            >
                        </li>
                    {/each}
                </ul>
                <span aria-current={isInsideMusicSubmenu ? 'page' : undefined}>
                    Our Music
                </span>
            </li>
            <li>
                <a
                    aria-current={segment === 'contact' ? 'page' : undefined}
                    href="/contact"
                >
                    Contacts
                </a>
            </li>
        </ul>
    </div>
    
</nav>

<style>
    :root {
        --highlight: #c4c4c4;
    }

    nav {
        font-size: 16px;
        font-weight: 500;
        z-index: 1;
    }

    .menu {
        display: none;
    }

    .navbar {
        /* to decorate the hamburger bar */
    } 

    .toggle-button {
        position: fixed;
        top: .75rem;
        right: 2rem;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 25px;
        height: 0.01em;
    }

    .toggle-button .bar{
        margin: 1px;
        width: 80%;
        background-color: whitesmoke;
        border-radius: 1px;
    }


    .container {
        max-width: 80%; 
        padding: 0 2em 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .navbar-links ul{
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        list-style-type: none;
        padding-inline-start: unset;
    }

    .navbar-links li{
        display: block;
        text-align: center;
        margin: 5px;
    }

    .navbar-links li > * {
        box-sizing: border-box;
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
        background-color: var(--highlight);
        display: block;
        bottom: -1px;
    }

    .navbar-links a, span {
        text-decoration: none;
        padding: 0 0.5em 0.5em;
        display: block;
        width: 100%;
    }

    .navbar-links li > *:hover {
        opacity: 0.5;
    }

    .dropdown {
        display: flex;
        flex-direction: column;
    }

    .dropdown ul {
        transition: all 0.5s ease;
        margin-top: 1rem 5px 5px;
        background-color: transparent;
        text-align: center;
        opacity: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dropdown:hover > ul,
    .dropdown:hover > ul:hover {
        display: flex;
        opacity: 1;
        transform: translateY(calc(100% + 36px));
    }
    .dropdown ul li {
        clear: both;
        width: 100%;
    }
    .dropdown ul li a {
        box-sizing: border-box;
        text-align: center;
    }

    
    @media (max-width: 700px) {
        nav {
            font-size: 14px;
        }

        .navbar {
            display: flex;
        }

        .menu{
            display: flex;
        }

        .container {
            max-width: 90%;
            flex-direction: column;
            align-items: flex-start;
        }

        .navbar-links {
            display: none;
        }

        .toggle-button {
            display: flex;
        }
    }
</style>


