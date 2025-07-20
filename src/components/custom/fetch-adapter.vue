<script generic="T, E, AD extends AsyncData<T, E>" lang="ts" setup>
import type { AsyncData } from '#app'

defineProps<{
	readonly request: AD
}>()
</script>

<template>
	<template v-if="(request.status.value === 'idle')">
		<slot name="idle">
			<Message severity="info">...</Message>
		</slot>
	</template>

	<template v-if="(request.status.value === 'pending')">
		<slot name="pending">
			<ProgressSpinner/>
		</slot>
	</template>

	<template v-if="(request.status.value === 'success')">
		<template v-if="request.data.value === null || request.data.value.code !== 0">
			<Message severity="error">{{ request.data.value === null ? '请求错误' : request.data.value.message ?? '未知错误' }}</Message>
		</template>

		<template v-else>
			<slot :code="request.data.value.code" :data="request.data.value.data" :message="request.data.value.message" name="success"/>
		</template>
	</template>

	<template v-if="(request.status.value === 'error')">
		<slot :error="request.error.value" name="error">
			<Message severity="error">{{ request.error.value }}</Message>
		</slot>
	</template>
</template>