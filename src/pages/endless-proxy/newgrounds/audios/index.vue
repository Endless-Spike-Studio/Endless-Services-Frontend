<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { isNullish } from 'remeda'

const id = ref<number>()

const message = useMessage()
const router = useRouter()

const submit = () => {
	if (isNullish(id.value)) {
		message.error('请输入歌曲 ID')
		return
	}

	router.push('/endless-proxy/newgrounds/audios/' + id.value)
}
</script>

<template>
	<n-card class="sm:w-1/2 mx-auto">
		<n-flex :wrap="false">
			<n-input v-model:value="id" placeholder="歌曲 ID"/>
			<n-button @click="submit">查询</n-button>
		</n-flex>
	</n-card>
</template>