<script setup lang="ts">

import { HeartOutlined, UsergroupAddOutlined } from '@vicons/antd'
</script>

<template>
	<n-flex vertical>
		<div class="text-center">
			<h1 class="!mb-0">Endless Services</h1>
			<h4 class="!mt-0">提供了一些好用的 Geometry Dash 服务</h4>
		</div>

		<n-flex justify="center">
			<n-button tag="a" href="https://zhazha120.cn/support">
				<template #icon>
					<n-icon :component="HeartOutlined"/>
				</template>

				赞助 & 支持
			</n-button>

			<n-button tag="a" href="https://qm.qq.com/cgi-bin/qm/qr?k=JXZtHi9cVJ9Rbs3NhAkvgfWFSpUihLuz&authKey=jb6nad5isOaONSymdbydSKK/lB7lBwnBRYMvadNLDb3MI3X2sSmOfW9dndIAy5Za">
				<template #icon>
					<n-icon :component="UsergroupAddOutlined"/>
				</template>

				交流群
			</n-button>
		</n-flex>
	</n-flex>
</template>