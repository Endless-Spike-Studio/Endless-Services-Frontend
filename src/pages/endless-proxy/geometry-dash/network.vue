<script setup lang="ts">
import { tryOnMounted, until } from '@vueuse/core'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js/with-encryption'

const request = useFetch('/api/EndlessProxy/GeometryDash/network/websocket', {
	retry: false,
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	responseType: 'json'
})

interface Response {
	readonly path: string
	readonly data: Record<string, string>
	readonly headers: Record<string, string>
	readonly response: string
	readonly log_at: string
}

const logs = ref<Response[]>([])

tryOnMounted(async () => {
	await until(request.status).toBe('success')

	const echo = new Echo({
		Pusher,
		...request.data.value
	})

	const channel = echo.channel(request.data.value.channel.name)

	channel.listen(`.${request.data.value.event}`, async data => {
		const request = useFetch(`/api/EndlessProxy/GeometryDash/network/${data.key}`, {
			retry: false,
			baseURL: import.meta.env.VITE_APP_BASE_URL,
			responseType: 'json'
		})

		await until(request.status).toBe('success')

		logs.value.push({
			...request.data.value,
			log_at: new Date().toLocaleString()
		})
	})
})
</script>

<template>
	<n-card title="网络日志">
		<n-list bordered>
			<template v-for="log in logs">
				<n-list-item>
					<n-collapse>
						<n-collapse-item :title="log.path">
							<template #header-extra>
								<n-text>{{ log.log_at }}</n-text>
							</template>

							<n-flex vertical size="small">
								<n-flex vertical :size="0">
									<template v-for="(value, key) in log.headers">
										<n-text :depth="3">{{ key }}: {{ value.join(', ') }}</n-text>
									</template>
								</n-flex>

								<div/>

								<n-text :depth="3">{{ Object.entries(log.data).map(([key, value]) => `${key}=${value}`).join('&') }}</n-text>
							</n-flex>

							<div class="mt-5">
								<n-text>{{ log.response }}</n-text>
							</div>
						</n-collapse-item>
					</n-collapse>
				</n-list-item>
			</template>

			<n-list-item v-if="logs.length <= 0">
				<n-empty/>
			</n-list-item>
		</n-list>
	</n-card>
</template>