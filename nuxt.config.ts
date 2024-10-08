import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
	ssr: false,
	srcDir: 'src',
	router: {
		options: {
			hashMode: true
		}
	},
	modules: [
		'@unocss/nuxt'
	],
	vite: {
		plugins: [
			AutoImport({
				imports: [
					{
						'naive-ui': [
							'useDialog',
							'useModal',
							'useMessage',
							'useNotification',
							'useLoadingBar'
						]
					}
				]
			}),
			Components({
				resolvers: [
					NaiveUiResolver()
				]
			})
		]
	}
})