<script lang="ts" setup>
definePageMeta({
	name: '首页'
})
</script>

<template>
	<div class="container mx-auto mt-10">
		<div class="flex flex-col items-center gap-2.5">
			<span class="text-6 fw-bold">提供了一些好用的 Geometry Dash 服务</span>
			<Button as="a" class="no-underline fw-bold" href="https://github.com/Endless-Spike-Studio" label="Endless Spike Studio" variant="text"/>

			<div class="flex justify-center gap-2.5">
				<Button as="a" class="no-underline" href="https://zhazha120.cn/support" icon="i-ant-design:heart-outlined" label="赞助 & 支持" severity="secondary"/>
				<Button as="a" class="no-underline" href="https://qm.qq.com/cgi-bin/qm/qr?k=JXZtHi9cVJ9Rbs3NhAkvgfWFSpUihLuz&authKey=jb6nad5isOaONSymdbydSKK/lB7lBwnBRYMvadNLDb3MI3X2sSmOfW9dndIAy5Za" icon="i-ant-design:user-add-outlined" label="交流群" severity="secondary"/>
			</div>
		</div>
	</div>
</template>