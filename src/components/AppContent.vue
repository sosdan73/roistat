<template>
    <div class="content">
		<div class="content__row">
			<h1 class="content__title">
				Тестовое задание для Roistat
			</h1>
		</div>
		<div class="content__row --suppressed">
			<UsersTable/>
		</div>
		<div class="content__row">
			<button
				class="content__button button --dark"
				@click="openModal"
			>
				Добавить
			</button>
		</div>
    </div>
</template>

<script>
import UsersTable from "./UsersTable";

export default {
    name: "AppContent",
    components: {
        UsersTable,
    },
    methods: {
        openModal() {
			this.$modal.showModal()
        }
    }
}
</script>

<style lang="scss">
.content {
	flex-grow: 1;
	width: 100%;
	min-width: 320px;
	max-width: 1360px;
	box-sizing: border-box;
	padding: 60px 40px;
	margin: 0 auto;
}
.content__row:not(:last-child) {
	margin-bottom: 40px;
}
.content__row.--suppressed {
	padding-left: 1px;
	padding-right: 1px;
}
.content__title {
    margin-top: 0;
    text-align: center;
}
.content__button {
	display: block;
	margin: 0 auto;
}
@media (max-width: 600px) {
	.content {
		padding: 60px 10px;
	}
}
</style>
