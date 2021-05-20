/** @type {import('@sveltejs/kit').Config} */
import netlify from "@sveltejs/adapter-netlify"

const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
	compilerOptions: null,

	// an array of file extensions that should be treated as Svelte components
	extensions: ['.svelte'],

	kit: {
		adapter: netlify()
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: null
};

export default config;