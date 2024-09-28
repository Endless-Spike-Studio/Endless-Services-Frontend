<script setup lang="ts">
import { RouterLink } from '#vue-router'
import { NetworkPublic, Playlist, ServerProxy } from '@vicons/carbon'
import { darkTheme, dateZhCN, lightTheme, type MenuOption, NIcon, NImage, useOsTheme, zhCN } from 'naive-ui'
import geometry_dash from '~/assets/images/geometry_dash.webp'
import logo from '~/assets/images/logo.webp'
import newgrounds from '~/assets/images/newgrounds.webp'
import isMobile from '~/core/shared/isMobile'

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
			to: '/'
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
				label: () => h(RouterLink, {
					to: '/endless-proxy/geometry-dash'
				}, {
					default: () => 'Geometry Dash'
				}),
				key: '/endless-proxy/geometry-dash',
				icon: () => h(NImage, {
					src: geometry_dash,
					class: 'rounded',
					imgProps: {
						class: 'size-8'
					}
				}),
				children: [
					{
						label: () => h(RouterLink, {
							to: '/endless-proxy/geometry-dash/network'
						}, {
							default: () => '网络日志'
						}),
						key: '/endless-proxy/geometry-dash/network',
						icon: () => h(NIcon, {
							component: NetworkPublic
						})
					}
				]
			},
			{
				label: 'Newgrounds',
				key: '/endless-proxy/newgrounds',
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
							to: '/endless-proxy/newgrounds/audios'
						}, {
							default: () => '歌曲搜索'
						}),
						key: '/endless-proxy/newgrounds/audios',
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
								<n-layout native-scrollbar position="absolute">
									<n-layout-header>
										<n-menu :options="menus" :mode="(isMobile ? 'vertical' : 'horizontal')" :value="route.fullPath"/>
									</n-layout-header>

									<n-layout-content class="container mx-auto h-full">
										<div :class="{ 'px-2': isMobile }" class="py-2">
											<NuxtPage/>
										</div>
									</n-layout-content>

									<n-layout-footer class="p-2">
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