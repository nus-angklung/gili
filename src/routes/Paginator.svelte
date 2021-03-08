<script>
    export let items;
    export let visibleindex;
</script>

<style>
    paginator-item:before {
        content: '\25CF';
        font-size: 20px;
    }
    .active {
        color: orange;
    }
    .flexcenter {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<paginator class="flexcenter">
    {#each items as item, index}
        <paginator-item
            class:active={visibleindex === index}
            on:click={() => (visibleindex = index)} />
    {/each}
</paginator>
