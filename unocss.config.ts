import { defineConfig, presetIcons, presetWebFonts, presetWind3, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
	presets: [
		presetWind3(),
		presetIcons(),
		presetWebFonts({
			provider: 'none',
			fonts: {
				sans: ['HarmonyOS Sans SC', 'HarmonyOS Sans']
			}
		})
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass()
	]
})