<script lang="ts" setup>

const route = useRoute()

const id = computed({
	get: () => {
		if (route.params.id === '') {
			return null
		}

		return Number(route.params.id)
	},
	set: (value: number) => {
		navigateTo({
			params: {
				id: value
			},
			replace: true
		})
	}
})

const request = id.value !== null ? useFetch<{
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
}>(`/api/EndlessProxy/GeometryDash/Song/${id.value}`, {
	responseType: 'json'
}) : null
</script>

<template>
	<div class="container mx-auto">
		<div class="flex flex-col gap-2.5">
			<InputNumber v-model="id" :step="1" :use-grouping="false" fluid/>

			<Panel v-if="request !== null" :dt="{ 'header.padding': '0.5rem' }">
				<template v-if="(request.status.value === 'idle')">
					<div class="flex justify-center">
						<Message severity="info">...</Message>
					</div>
				</template>

				<template v-if="(request.status.value === 'pending')">
					<div class="flex justify-center">
						<ProgressSpinner/>
					</div>
				</template>

				<template v-if="(request.status.value === 'success')">
					<div class="flex flex-col gap-2.5">
						<span class="fw-bold">名称: {{ request.data.value!.name }}</span>
						<span class="fw-bold">艺术家 ID: {{ request.data.value!.artist_id }}</span>
						<span class="fw-bold">艺术家: {{ request.data.value!.artist_name }}</span>
						<span class="fw-bold">大小: {{ request.data.value!.size }}</span>

						<div class="flex gap-2.5">
							<template v-if="request.data.value!.is_disabled">
								<Tag severity="danger" value="禁止使用"/>
							</template>

							<template v-else>
								<Button :href="request.data.value!.download_url" as="a" class="no-underline" icon="i-ant-design:download-outlined" label="下载" severity="secondary"/>
							</template>
						</div>
					</div>
				</template>

				<template v-if="(request.status.value === 'error')">
					<div class="flex justify-center">
						<Message severity="error">{{ request.error.value!.message }}</Message>
					</div>
				</template>
			</Panel>
		</div>
	</div>
</template>