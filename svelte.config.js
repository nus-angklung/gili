import netlify from "@sveltejs/adapter-netlify"
import fs from 'fs';
import path from 'path';

import { string } from 'rollup-plugin-string';

const dev = process.env.NODE_ENV === 'development'
// https://github.com/rollup/rollup/issues/2463#issuecomment-455957865

// Basically, the function 'newsTargetVirtualModule' helps to import 'news-target'.
// 'news-target' is crucial for exporting all file names that are contained in the directory /news.
const newsTargetVirtualModule = () => ({
    name: "news-targets",
    resolveId(id) {
        return id === 'news-targets' ? id : null;
    },
    load(id) {
        if (id === 'news-targets') {
            const targetDir = path.join(path.resolve(), 'news');
            const files = fs.readdirSync(targetDir);
            const objectEntries = files.map(
                (file) =>
                    `  '${file}': () => import('${path.join(targetDir, file)}')`
            );
            return `export default {\n${objectEntries.join(',\n')}\n};`;
        }
        return null;
    },
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
    compilerOptions: {
        css: false,
        hydratable: true,
        dev,
    },

    // an array of file extensions that should be treated as Svelte components
    extensions: ['.svelte'],

    kit: {
        adapter: netlify(),

        vite: {
            plugins: [
                newsTargetVirtualModule(),
                //@ts-ignore
                string({
                    include: '**/*.txt',
                }),
            ],
            optimizeDeps: {
                include: ["fuzzy"],
            },
        }
    },

    // options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
    preprocess: null
};

export default config;
