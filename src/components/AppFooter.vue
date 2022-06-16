<template>
    <footer class="footer">
		<div>
			<span>Выполнил Сосинский Даниил</span>
		</div>
		<div>
			<span>&copy; 2022 Roistat</span>
		</div>
    </footer>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style lang="scss">
.footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
    height: 80px;
    padding: 10px 20px;
    box-sizing: border-box;
	@include dark;
	font-size: 12px;
	line-height: 16px;
}
</style>
