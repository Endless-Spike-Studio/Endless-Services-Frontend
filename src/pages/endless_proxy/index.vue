<script lang="ts" setup>
definePageMeta({
	name: 'Endless Proxy'
})
</script>

<template>
	<div class="container mx-auto">
		<div class="flex flex-col items-center gap-2.5">
			<Panel class="w-full" header="开始使用">
				<div class="flex flex-col gap-2.5">
					<iframe class="border-none aspect-video" src="//player.bilibili.com/player.html?bvid=BV1s4PMewEJC"/>

					<div class="flex gap-2.5">
						<Button as="a" class="no-underline" href="https://geode-sdk.org/" icon="i-ant-design:download-outlined" label="下载 Geode" severity="secondary"/>
						<Button as="a" class="no-underline" href="https://cdn.endless-services.zhazha120.cn/download/endless-spike-studio.endless-services-connector-default-endless-proxy.geode" icon="i-ant-design:download-outlined" label="下载 Mod" severity="secondary"/>
					</div>
				</div>
			</Panel>

			<Panel class="w-full" header="在线工具">
				<div class="flex gap-2.5">
					<Button icon="i-ant-design:info-circle-outlined" label="Geometry Dash 歌曲查询" severity="secondary" @click="navigateTo({ path: 'endless_proxy/geometry_dash/song' })"/>
					<Button icon="i-ant-design:search-outlined" label="Geometry Dash 歌曲搜索" severity="secondary" @click="navigateTo({ path: 'endless_proxy/geometry_dash/song/search' })"/>
				</div>
			</Panel>
		</div>
	</div>
</template>