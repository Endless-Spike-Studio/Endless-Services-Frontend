<script lang="ts" setup>
import { useAsyncData } from '#app'
import type { PageState } from 'primevue'
import http from '~/shared/http'
import type { ApiResponse } from '~/types/api'

const form = ref<{
	readonly paginate: {
		readonly page: number
		readonly limit: number | null
	}

	readonly  sort: {
		readonly  size: 'asc' | 'desc' | null
		readonly  cache_at: 'asc' | 'desc' | null
	}

	readonly filter: {
		readonly id: number | null
		readonly song_id: number | null
		readonly name: string | null
		readonly size_gt: number | null
		readonly size_lt: number | null
		readonly is_disabled: boolean | null
	}

	readonly fetchCount: boolean
}>({
	paginate: {
		page: 1,
		limit: null
	},
	sort: {
		size: null,
		cache_at: null
	},
	filter: {
		id: null,
		song_id: null,
		name: null,
		size_gt: null,
		size_lt: null,
		is_disabled: null
	},
	fetchCount: true
})

const filteredForm = computed(() => {
	const _process = <T extends object>(item: T) => {
		return Object.entries(item)
			.reduce(
				(result, [key, value]) => {
					if (value !== null && value !== '') {
						result[key] = value instanceof Object ? _process(value) : value
					}
					return result
				},
				{} as Record<string, unknown>
			)
	}

	return _process(form.value)
})

const { status, data: response, error, refresh } = useAsyncData('endless_proxy:geometry_dash:song:search', async () => {
	return http.Post<
		ApiResponse<{
			readonly items: {
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
			}[]

			readonly paginator: {
				readonly page: number
				readonly limit: number
			}

			readonly count: number | null
		}>
	>(`/api/EndlessProxy/GeometryDash/Song/Search`, filteredForm.value)
}, {
	watch: [filteredForm]
})

const handlePage = async (data: PageState) => {
	// @ts-ignore
	form.value.paginate.page = data.page + 1

	await nextTick(() => {
		refresh()
	})
}

const isDisabledSelectOptions = [
	{
		label: '未指定',
		value: null
	},
	{
		label: '未禁用',
		value: false
	},
	{
		label: '已禁用',
		value: true
	}
]

const sorter = ref<string | null>(null)

watch(sorter, newSorter => {
	if (newSorter === null) {
		Object.keys(form.value.sort)
			.forEach(key => {
				if (key in form.value.sort) {
					// @ts-ignore
					form.value.sort[key] = null
				}
			})

		return
	}

	const [key, order] = newSorter.split(':')

	if (key in form.value.sort) {
		// @ts-ignore
		form.value.sort[key] = order
	}
})

const sortSelectOptions = [
	{
		label: '默认排序',
		value: null
	},
	{
		label: '歌曲文件大小 升序',
		value: 'size:asc'
	},
	{
		label: '歌曲文件大小 降序',
		value: 'size:desc'
	},
	{
		label: '缓存时间 升序',
		value: 'cache_at:asc'
	},
	{
		label: '缓存时间 降序',
		value: 'cache_at:desc'
	}
]
</script>

<template>
	<div class="container mx-auto">
		<div class="flex flex-col gap-2.5">
			<Panel :dt="{ 'header.padding': '0.5rem' }">
				<div class="flex lt-md:(flex-col [&>*>*]:!w-full) gap-2.5">
					<IftaLabel>
						<Select v-model="sorter" :options="sortSelectOptions" class="w-69" option-label="label" option-value="value"/>
						<label>排序</label>
					</IftaLabel>

					<IftaLabel>
						<InputNumber v-model="form.filter.id" :min="1" :step="1" :use-grouping="false" allow-empty/>
						<label>ID</label>
					</IftaLabel>

					<IftaLabel>
						<InputNumber v-model="form.filter.song_id" :min="1" :step="1" :use-grouping="false" allow-empty/>
						<label>歌曲 ID</label>
					</IftaLabel>

					<IftaLabel>
						<InputText v-model="form.filter.name" allow-empty/>
						<label>歌曲名 (前缀匹配)</label>
					</IftaLabel>

					<IftaLabel>
						<InputNumber v-model="form.filter.size_gt" :min="0" :step="0.01" :use-grouping="false" allow-empty suffix="MB"/>
						<label>歌曲文件大小最小限制</label>
					</IftaLabel>

					<IftaLabel>
						<InputNumber v-model="form.filter.size_lt" :min="0" :step="0.01" :use-grouping="false" allow-empty suffix="MB"/>
						<label>歌曲文件大小最大限制</label>
					</IftaLabel>

					<IftaLabel>
						<Select v-model="form.filter.is_disabled" :options="isDisabledSelectOptions" class="w-69" option-label="label" option-value="value"/>
						<label>是否禁用</label>
					</IftaLabel>
				</div>
			</Panel>

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
						<DataTable :value="response.data.items" scrollable table-class="min-w-300">
							<Column field="id" header="ID"/>
							<Column field="song_id" header="歌曲 ID"/>
							<Column field="name" header="歌曲名"/>
							<Column field="artist_id" header="艺术家 ID"/>
							<Column field="artist_name" header="艺术家"/>
							<Column field="size" header="文件大小"/>
							<Column header="缓存时间">
								<template #body="{ data }">
									{{ new Date(data.cache_at.date).toLocaleString() }}
								</template>
							</Column>
							<Column header="操作">
								<template #body="{ data }">
									<template v-if="data.is_disabled">
										<Tag severity="danger" value="禁止使用"/>
									</template>

									<template v-else>
										<Button :href="data.download_url" as="a" class="no-underline" icon="i-ant-design:download-outlined" label="下载" severity="secondary" size="small"/>
									</template>
								</template>
							</Column>
						</DataTable>

						<Paginator :first="(response.data.paginator.page - 1) * response.data.paginator.limit" :rows="response.data.paginator.limit" :totalRecords="response.data.count ?? 0" @page="handlePage"/>
					</template>

					<template v-if="(status === 'error')">
						<Message severity="error">{{ error }}</Message>
					</template>
				</div>
			</Panel>
		</div>
	</div>
</template>