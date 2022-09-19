// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	build: {
		transpile: ["@headlessui/vue"],
	},
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt-icon", "@vueuse/nuxt"],
	tailwindcss: {
		cssPath: "~/assets/main.css",
	},
	// Google config
	googleFonts: {
		families: {
			Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
		useStylesheet: true,
		download: false,
	},
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
		},
	},
});
