<script setup lang="ts">
import { RouterLink } from '#vue-router'
import { Playlist, ServerProxy } from '@vicons/carbon'
import { darkTheme, dateZhCN, lightTheme, type MenuOption, NIcon, NImage, useOsTheme, zhCN } from 'naive-ui'
import logo from '~/assets/images/logo.webp'
import newgrounds from '~/assets/images/newgrounds.webp'

const osTheme = useOsTheme()
const theme = computed(() => {
	switch (osTheme.value) {
		case 'light':
			return lightTheme
		case 'dark':
			return darkTheme
		default:
			return null
	}
})

const menus: MenuOption[] = [
	{
		label: () => h(RouterLink, {
			to: {
				path: '/'
			}
		}, {
			default: () => 'Endless Services'
		}),
		key: '/',
		icon: () => h(NImage, {
			src: logo,
			class: 'rounded',
			imgProps: {
				class: 'size-8'
			}
		})
	},
	{
		label: 'Endless Proxy',
		key: '/endless-proxy',
		icon: () => h(NIcon, {
			component: ServerProxy
		}),
		children: [
			{
				label: 'Newgrounds Proxy',
				key: '/endless-proxy/newgrounds-proxy',
				icon: () => h(NImage, {
					src: newgrounds,
					class: 'rounded',
					imgProps: {
						class: 'size-8'
					}
				}),
				children: [
					{
						label: () => h(RouterLink, {
							to: {
								path: '/endless-proxy/newgrounds-proxy/songs'
							}
						}, {
							default: () => '歌曲搜索'
						}),
						key: '/endless-proxy/newgrounds-proxy/songs',
						icon: () => h(NIcon, {
							component: Playlist
						})
					}
				]
			}
		]
	}
]

const route = useRoute()
</script>

<template>
	<NuxtLayout>
		<NuxtLoadingIndicator/>

		<n-config-provider :date-locale="dateZhCN" :locale="zhCN" :theme="theme">
			<n-dialog-provider>
				<n-loading-bar-provider>
					<n-message-provider>
						<n-modal-provider>
							<n-notification-provider>
								<n-layout :native-scrollbar="false" position="absolute">
									<n-layout-header position="absolute">
										<n-menu :options="menus" mode="horizontal" :value="route.fullPath"/>
									</n-layout-header>

									<n-layout-content class="container mx-auto !top-16" position="absolute">
										<NuxtPage/>
									</n-layout-content>

									<n-layout-footer class="p-2" position="absolute">
										<n-flex :size="0" align="center" vertical>
											<n-text>&copy; 2024 - {{ new Date().getFullYear() }}</n-text>

											<n-button href='https://beian.miit.gov.cn' tag='a' text>
												<n-text :depth="3" class="hover:text-current">
													赣 ICP 备 2022005275 号
												</n-text>
											</n-button>

											<n-button href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=36070202001088" tag="a" text>
												<n-text :depth="3" class="hover:text-current">
													赣公网安备 36070202001088 号
												</n-text>
											</n-button>
										</n-flex>
									</n-layout-footer>
								</n-layout>
							</n-notification-provider>
						</n-modal-provider>
					</n-message-provider>
				</n-loading-bar-provider>
			</n-dialog-provider>
		</n-config-provider>
	</NuxtLayout>
</template>

<style lang="scss">
@import '~/styles/transitions/page';
</style>