<script setup lang="ts">
const route = useRoute()

const request = useFetch(`/api/EndlessProxy/Newgrounds/Audios/${route.params.id}`, {
	retry: false,
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	responseType: 'json'
})
</script>

<template>
	<n-card class="sm:w-1/2 mx-auto">
		<template v-if="(request.status.value === 'success')">
			<n-flex vertical :size="0">
				<n-text>缓存 ID:{{ request.data.value.id }}</n-text>
				<n-text>歌曲 ID:{{ request.data.value.song_id }}</n-text>
				<n-text>歌曲名称: {{ request.data.value.name }}</n-text>
				<n-text>艺术家 ID: {{ request.data.value.artist_id }}</n-text>
				<n-text>艺术家名称": {{ request.data.value.artist_name }}</n-text>
				<n-text>大小": {{ request.data.value.size }}MB</n-text>

				<n-text>
					禁用:
					<n-checkbox disabled :value="request.data.disabled"/>
				</n-text>

				<n-text label="下载地址">
					下载地址:
					<n-button type="primary" text tag="a" :href="decodeURIComponent(request.data.value.original_download_url)">
						<n-text class="text-(left current wrap)">{{ decodeURIComponent(request.data.value.original_download_url) }}</n-text>
					</n-button>
				</n-text>

				<n-text label="缓存下载地址">
					缓存下载地址:
					<n-button type="primary" text tag="a" :href="request.data.value.download_url">
						<n-text class="text-(left current wrap)">{{ request.data.value.download_url }}</n-text>
					</n-button>
				</n-text>

				<n-text>缓存时间: {{ new Date(request.data.value.created_at).toLocaleString() }}</n-text>
				<n-text>缓存最后更新时间: {{ new Date(request.data.value.updated_at).toLocaleString() }}</n-text>
			</n-flex>
		</template>

		<template v-if="(request.status.value === 'pending')">
			<n-flex vertical align="center" :size="0">
				<n-spin size="large"/>
				<n-h2>加载中</n-h2>
			</n-flex>
		</template>

		<template v-if="(request.status.value === 'error')">
			<n-result status="error" title="出错了" description="可能是该歌曲不存在" size="small"/>
		</template>
	</n-card>
</template>