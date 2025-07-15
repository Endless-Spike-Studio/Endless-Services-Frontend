<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem'
import logo from '~/assets/logo.webp?url'

const route = useRoute()

const menus = computed(() => {
	return [
		{
			name: '首页',
			icon: 'i-ant-design:home-outlined'
		},
		{
			name: 'Endless Proxy',
			icon: 'i-carbon:server-proxy'
		}
	].map(data => {
		return {
			label: data.name,
			icon: data.icon,
			disabled: route.name === data.name,
			command: () => {
				navigateTo({
					name: data.name
				})
			}
		} satisfies MenuItem
	})
})
</script>

<template>
	<div class="flex flex-col m-2.5">
		<Menubar :model="menus" :pt="{ root: { class: 'lt-md:(flex justify-between)' }, rootList: { class: 'lt-md:!mt-2.5' } }">
			<template #start>
				<div class="md:mr-5 flex items-center gap-2.5">
					<Image :src="logo" image-class="w-10"/>
					<span class="text-5 fw-extrabold">Endless Services</span>
				</div>
			</template>
		</Menubar>

		<div class="p-2.5">
			<slot/>
		</div>
	</div>
</template>