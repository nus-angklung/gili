<script>
    export let items;
    export let visibleindex;

    import { bounceOut as easingfunc } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { onMount, beforeUpdate } from 'svelte';

    let contents;
    let visible;

    let leftlist = [];
    let centerlist = [];

    function moveRight() {
        if (visibleindex < items.length - 1) {
            visibleindex++;
            centerlist = [items[visibleindex]];
        }
    }

    function moveLeft() {
        if (visibleindex < items.length && visibleindex > 0) {
            visibleindex--;
            centerlist = [items[visibleindex]];
        }
    }
    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: easingfunc,
                css: (t) => `
					transform: ${transform} scale(${t});					
				`,
            };
        },
    });

    onMount(() => {
        items = items.map((data, i) => {
            return { index: i, data: { ...data, moveRight } };
        });
        centerlist = [items[visibleindex]];
        leftlist = visibleindex > 0 ? [items[visibleindex - 1]] : [];
    });
</script>

<style>
    carousel {
        display: flex;
    }

    @media screen (max-width: 992px) {
        carousel {
            max-width: 300%;
        }
    }

    .justifycenter {
        justify-content: flex-end;
    }

    .justifystart {
        justify-content: flex-end;
    }
    .leftcenter {
        margin: 0;
        position: absolute;

        left: 45%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .rightcenter {
        margin: 0;
        position: absolute;

        left: 55%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>

<carousel
    bind:this={contents}
    class:justifycenter={leftlist.length == 0}
    class:justifystart={leftlist.length > 0}>
    {#each leftlist as row (row.index)}
        <carousel-item
            in:receive={{ key: row.index }}
            out:send={{ key: row.index }}
            animate:flip
            style={'opacity:0.4'}>
            <slot blah={row.data}>Missing template</slot>
        </carousel-item>
    {/each}
    {#each centerlist as row (row.index)}
        <carousel-item
            in:receive={{ key: row.index }}
            out:send={{ key: row.index }}
            animate:flip>
            <slot blah={row.data}>Missing template</slot>
        </carousel-item>
    {/each}
</carousel>

<button on:click={moveLeft} class="leftcenter">&lt-</button>
<button on:click={moveRight} class="rightcenter">-&gt</button>
