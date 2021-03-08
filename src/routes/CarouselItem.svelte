<script>
    export let imageUrl;
    export let title;
    export let file;
    export let alternative;
    export let description;

    import { content } from './content.js';
    export let visibleindex;
    const default_picture = 'client/news/default-picture.svg';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let moveRight;

    function buttonclick(button) {
        button.type === 'continue' ? moveRight() : console.log('Do Nothing');
    }
</script>

<style>
    .cardbox {
        display: flex;
        justify-content: auto;
        align-items: center;
        border: 1px solid grey;
        width: 780px;
        height: 550px;
        border-radius: 2px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        background-color: var(--link-highlight);
        margin: auto;
        padding: 30px;
    }

    .flexcenter {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
        row-gap: 2rem;
    }

    .photo {
        padding: 1rem 0;
        margin: auto;
        grid-column: 1/2;
    }

    .photo img {
        width: 100%;
    }

    .photo--text {
        position: relative;
        grid-column: 2/4;
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
</style>

<div class="grid cardbox flexcenter">
    <div class="photo">
        <img src={imageUrl} alt="{alternative}}" />
    </div>
    <div class="photo--text">
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
</div>
