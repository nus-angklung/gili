<div id="qr" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
</div>
<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const width = 320;
        const height = 320;
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        // TODO: Fetch QR code
        // const cells = ${JSON.stringify(cells)};
        
        const tileW = width  / cells.length;
        const tileH = height / cells.length;
        
        for (let r = 0; r < cells.length ; ++r) {
            const row = cells[r];
            for (let c = 0; c < row.length ; ++c) {
                ctx.fillStyle = row[c] ? '#000' : '#fff';
                const w = (Math.ceil((c+1)*tileW) - Math.floor(c*tileW));
                const h = (Math.ceil((r+1)*tileH) - Math.floor(r*tileH));
                ctx.fillRect(Math.round(c*tileW), Math.round(r*tileH), w, h);
            }
        }
        document.querySelector("#qr").appendChild(canvas);
    });
</script>
