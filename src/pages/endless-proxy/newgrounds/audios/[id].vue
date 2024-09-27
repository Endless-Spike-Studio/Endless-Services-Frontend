<script setup lang="ts">
const route = useRoute()

const request = useFetch(`/api/EndlessProxy/Newgrounds/Audios/${route.params.id}`, {
	retry: false,
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	responseType: 'json'
})
</script>

<template>
	<n-card class="w-1/2 mx-auto">
		<template v-if="(request.status.value === 'success')">
			<n-descriptions :columns="1" label-placement="left" size="0">
				<n-descriptions-item label="缓存 ID">{{ request.data.value.id }}</n-descriptions-item>
				<n-descriptions-item label="歌曲 ID">{{ request.data.value.song_id }}</n-descriptions-item>
				<n-descriptions-item label="歌曲名称">{{ request.data.value.name }}</n-descriptions-item>
				<n-descriptions-item label="艺术家 ID">{{ request.data.value.artist_id }}</n-descriptions-item>
				<n-descriptions-item label="艺术家名称">{{ request.data.value.artist_name }}</n-descriptions-item>
				<n-descriptions-item label="大小">{{ request.data.value.size }}MB</n-descriptions-item>
				<n-descriptions-item label="禁用">
					<n-checkbox disabled :value="request.data.disabled"/>
				</n-descriptions-item>
				<n-descriptions-item label="下载地址">
					<n-button type="primary" text tag="a" :href="decodeURIComponent(request.data.value.original_download_url)">
						{{ decodeURIComponent(request.data.value.original_download_url) }}
					</n-button>
				</n-descriptions-item>
				<n-descriptions-item label="缓存下载地址">
					<n-button type="primary" text tag="a" :href="request.data.value.download_url">{{ request.data.value.download_url }}</n-button>
				</n-descriptions-item>
				<n-descriptions-item label="缓存时间">{{ new Date(request.data.value.created_at).toLocaleString() }}</n-descriptions-item>
				<n-descriptions-item label="缓存最后更新时间">{{ new Date(request.data.value.updated_at).toLocaleString() }}</n-descriptions-item>
			</n-descriptions>
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