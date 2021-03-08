import fs from 'fs';
import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
    (warning.code === 'CIRCULAR_DEPENDENCY' &&
        /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning);

// https://github.com/rollup/rollup/issues/2463#issuecomment-455957865

// Basically, the function 'newsTargetVirtualModule' helps to import 'news-target'.
// 'news-target' is crucial for exporting all file names that are contained in the directory /news.
const newsTargetVirtualModule = () => ({
    resolveId(id) {
        return id === 'news-targets' ? id : null;
    },
    load(id) {
        if (id === 'news-targets') {
            const targetDir = path.join(__dirname, 'news');
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

const contentTargetVirtualModule = () => ({
    resolveId(id) {
        return id === 'content-targets' ? id : null;
    },
    load(id) {
        if (id === 'content-targets') {
            const targetDir = path.join(__dirname, 'activities');
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

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        plugins: [
            newsTargetVirtualModule(),
            contentTargetVirtualModule(),
            string({
                include: '**/*.txt',
            }),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                dev,
                hydratable: true,
                emitCss: true,
            }),
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),
            commonjs(),

            legacy &&
                babel({
                    extensions: ['.js', '.mjs', '.html', '.svelte'],
                    babelHelpers: 'runtime',
                    exclude: ['node_modules/@babel/**'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: '> 0.25%, not dead',
                            },
                        ],
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            newsTargetVirtualModule(),
            contentTargetVirtualModule(),
            string({
                include: '**/*.txt',
            }),
            replace({
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                generate: 'ssr',
                dev,
            }),
            resolve({
                dedupe: ['svelte'],
            }),
            commonjs(),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require('module').builtinModules ||
                Object.keys(process.binding('natives'))
        ),

        preserveEntrySignatures: 'strict',
        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            newsTargetVirtualModule(),
            contentTargetVirtualModule(),
            resolve(),
            replace({
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            commonjs(),
            !dev && terser(),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },
};
