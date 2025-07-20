<script lang="ts" setup>

import { useRouteParams } from '@vueuse/router'
import http from '~/shared/http'
import type { ApiResponse } from '~/types/api'

definePageMeta({
	validate: async route => {
		return typeof route.params.id === 'string' && (/^[1-9]\d*$/.test(route.params.id) || route.params.id === '')
	}
})

const id = useRouteParams('id', null, {
	transform: value => {
		if (value === null) {
			return null
		}

		return parseInt(value)
	}
})

const { status, data: response, error } = useAsyncData(`endless_proxy:geometry_dash:song:info:${id.value}`, async () => {
	return http.Get<
		ApiResponse<{
			readonly id: number
			readonly song_id: number
			readonly name: string
			readonly artist_id: number | null
			readonly artist_name: string | null
			readonly size: string
			readonly youtube_video_id: string | null
			readonly artist_youtube_url: string | null
			readonly is_verified: boolean
			readonly priority: number | null
			readonly original_download_url: string | null
			readonly download_url: string

			readonly type: {
				readonly name: string
				readonly value: number
			}

			readonly extra_artist_ids: string | null
			readonly is_new: boolean

			readonly new_type: {
				readonly name: string
				readonly value: number
			} | null

			readonly extra_artist_information: string | null
			readonly is_disabled: boolean

			readonly cache_at: {
				readonly date: string
				readonly timezone_type: number
				readonly timezone: string
			}
		}>
	>(`/api/EndlessProxy/GeometryDash/Song/${id.value}`)
}, {
	watch: [id]
})
</script>

<template>
	<div class="container mx-auto">
		<div class="flex flex-col gap-2.5">
			<IftaLabel>
				<InputNumber v-model="id" :min="1" :step="1" :use-grouping="false" fluid/>
				<label>ID</label>
			</IftaLabel>

			<Panel :dt="{ 'header.padding': '0.5rem' }">
				<div class="flex flex-col gap-2.5">
					<template v-if="(status === 'idle')">
						<Message severity="info">...</Message>
					</template>

					<template v-if="(status === 'pending')">
						<div class="flex justify-center">
							<ProgressSpinner/>
						</div>
					</template>

					<template v-if="status === 'success' && response !== null">
						<div class="flex flex-col gap-2.5">
							<span class="fw-bold">ID: {{ response.data.id }}</span>
							<span class="fw-bold">名称: {{ response.data.name }}</span>
							<span class="fw-bold">艺术家 ID: {{ response.data.artist_id }}</span>
							<span class="fw-bold">艺术家: {{ response.data.artist_name }}</span>
							<span class="fw-bold">文件大小: {{ response.data.size }}</span>
							<span class="fw-bold">缓存时间: {{ new Date(response.data.cache_at.date).toLocaleString() }}</span>
						</div>

						<div class="mt-2.5">
							<template v-if="response.data.is_disabled">
								<Tag severity="danger" value="禁止使用"/>
							</template>

							<template v-else>
								<Button :href="response.data.download_url" as="a" class="no-underline" icon="i-ant-design:download-outlined" label="下载" severity="secondary"/>
							</template>
						</div>
					</template>

					<template v-if="(status === 'error')">
						<Message severity="error">{{ error }}</Message>
					</template>
				</div>
			</Panel>
		</div>
	</div>
</template>