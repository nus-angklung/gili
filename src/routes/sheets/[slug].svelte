<!--
    This pdf rendering technique is based on the discussion: https://gist.github.com/fcingolani/3300351
    It depends on this library: https://mozilla.github.io/pdf.js/getting_started/#including-via-a-cdn
    If you want to upgrade, do change the GlobalWorkerOptions.workerSrc as well as the cdn script!
-->
<script context="module">
    import { parseSlug } from '$lib/util'
    /**
     * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ page }) {
        // the `slug` parameter is available because
        // this file is called [slug].svelte
        const filename = parseSlug(page.params.slug)

        return {
            props: { songUrl: `/client/sheets/${filename}` }
        }
    }
</script>
<script>
    import { onMount } from 'svelte';
    let cvs;
    export let songUrl; // songUrl (with the .pdf extension)

    onMount(() => {
        pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js'
        renderPDF(songUrl, cvs) //div element
    })

    function renderPDF(url, canvasContainer) {
        function renderPage(page) {
            let viewport = page.getViewport({scale: .5})
            const DPI = 72;
            const PRINT_OUTPUT_SCALE = DPI/72; 
            const scale = canvasContainer.clientWidth / viewport.width;
            const canvas = document.createElement('canvas')
            
            const ctx = canvas.getContext('2d')
            viewport = page.getViewport({scale})
        
            canvas.width = Math.floor(viewport.width * PRINT_OUTPUT_SCALE);
            canvas.height = Math.floor(viewport.height * PRINT_OUTPUT_SCALE);
            canvas.style.width = '100%';
        
            // canvas.style.transform = 'scale(1,1)';
            // canvas.style.transformOrigin = '0% 0%';
        
            const canvasWrapper = document.createElement('div');
        
            // canvasWrapper.style.width = '100%';
            // canvasWrapper.style.height = '100%';
        
            canvasWrapper.appendChild(canvas);
    
            const renderContext = {
                canvasContext: ctx,
                viewport,
            }
    
            canvasContainer.appendChild(canvasWrapper)
    
            page.render(renderContext)
        }
    
        function renderPages(pdfDoc) {
            for (let num = 1; num <= pdfDoc.numPages; num += 1)
                pdfDoc.getPage(num).then(renderPage)
        }
    
        pdfjsLib.getDocument(url).promise.then(renderPages)
    }
</script>

<svelte:head>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.min.js" integrity="sha512-SG4yH2eYtAR5eK4/VL0bhqOsIb6AZSWAJjHOCmfhcaqTkDviJFoar/VYdG96iY7ouGhKQpAg3CMJ22BrZvhOUA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<div bind:this={cvs}></div>
