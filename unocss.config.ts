import {
	defineConfig,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss'

export default defineConfig({
	presets: [
		presetUno(),
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
		transformerVariantGroup()
	]
})