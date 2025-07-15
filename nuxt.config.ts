import Aura from '@primeuix/themes/aura'


export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	ssr: false,
	srcDir: 'src',
	modules: [
		'@unocss/nuxt',
		'@primevue/nuxt-module'
	],
	primevue: {
		options: {
			theme: {
				preset: Aura
			}
		}
	}
})