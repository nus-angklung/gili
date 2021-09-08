const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/vision-mission.svelte"),
	() => import("../../../src/routes/attendance/__layout.reset.svelte"),
	() => import("../../../src/routes/attendance/index.svelte"),
	() => import("../../../src/routes/attendance/success.svelte"),
	() => import("../../../src/routes/attendance/qr.svelte"),
	() => import("../../../src/routes/our-music/index.svelte"),
	() => import("../../../src/routes/our-music/ProgressBarSlider.svelte"),
	() => import("../../../src/routes/our-music/ProgressBarTime.svelte"),
	() => import("../../../src/routes/our-music/AudioControls.svelte"),
	() => import("../../../src/routes/our-music/TrackHeading.svelte"),
	() => import("../../../src/routes/our-music/VolumeSlider.svelte"),
	() => import("../../../src/routes/our-music/AudioPlayer.svelte"),
	() => import("../../../src/routes/our-music/Playlist.svelte"),
	() => import("../../../src/routes/our-music/Slider.svelte"),
	() => import("../../../src/routes/contact/index.svelte"),
	() => import("../../../src/routes/contact/form.svelte"),
	() => import("../../../src/routes/sheets/index.svelte"),
	() => import("../../../src/routes/sheets/[slug].svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/news/index.svelte"),
	() => import("../../../src/routes/news/[...slug].svelte"),
	() => import("../../../src/routes/team/index.svelte"),
	() => import("../../../src/routes/team/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/vision-mission.svelte
	[/^\/vision-mission\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/attendance/index.svelte
	[/^\/attendance\/?$/, [c[4], c[5]], []],

	// src/routes/attendance/success.svelte
	[/^\/attendance\/success\/?$/, [c[4], c[6]], []],

	// src/routes/attendance/qr.svelte
	[/^\/attendance\/qr\/?$/, [c[4], c[7]], []],

	// src/routes/our-music/index.svelte
	[/^\/our-music\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/our-music/ProgressBarSlider.svelte
	[/^\/our-music\/ProgressBarSlider\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/our-music/keyboardShortcut.js
	[/^\/our-music\/keyboardShortcut\/?$/],

	// src/routes/our-music/ProgressBarTime.svelte
	[/^\/our-music\/ProgressBarTime\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/our-music/AudioControls.svelte
	[/^\/our-music\/AudioControls\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/our-music/TrackHeading.svelte
	[/^\/our-music\/TrackHeading\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/our-music/VolumeSlider.svelte
	[/^\/our-music\/VolumeSlider\/?$/, [c[0], c[13]], [c[1]]],

	// src/routes/our-music/AudioPlayer.svelte
	[/^\/our-music\/AudioPlayer\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/our-music/audioData.js
	[/^\/our-music\/audioData\/?$/],

	// src/routes/our-music/Playlist.svelte
	[/^\/our-music\/Playlist\/?$/, [c[0], c[15]], [c[1]]],

	// src/routes/our-music/Slider.svelte
	[/^\/our-music\/Slider\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/contact/index.svelte
	[/^\/contact\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/contact/form.svelte
	[/^\/contact\/form\/?$/, [c[0], c[18]], [c[1]]],

	// src/routes/sheets/index.svelte
	[/^\/sheets\/?$/, [c[0], c[19]], [c[1]]],

	// src/routes/sheets/[slug].svelte
	[/^\/sheets\/([^/]+?)\/?$/, [c[0], c[20]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[21]], [c[1]]],

	// src/routes/news/index.svelte
	[/^\/news\/?$/, [c[0], c[22]], [c[1]]],

	// src/routes/news/[slug].json.js
	[/^\/news\/([^/]+?)\.json$/],

	// src/routes/news/[...slug].svelte
	[/^\/news(?:\/(.*))?\/?$/, [c[0], c[23]], [c[1]], (m) => ({ slug: d(m[1] || '')})],

	// src/routes/team/index.json.js
	[/^\/team\.json$/],

	// src/routes/team/index.svelte
	[/^\/team\/?$/, [c[0], c[24]], [c[1]]],

	// src/routes/team/[slug].json.js
	[/^\/team\/([^/]+?)\.json$/],

	// src/routes/team/[slug].svelte
	[/^\/team\/([^/]+?)\/?$/, [c[0], c[25]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/api/update-attendance.js
	[/^\/api\/update-attendance\/?$/],

	// src/routes/api/generate-qr-code.js
	[/^\/api\/generate-qr-code\/?$/],

	// src/routes/api/contact-form.js
	[/^\/api\/contact-form\/?$/]
];

export const fallback = [c[0](), c[1]()];