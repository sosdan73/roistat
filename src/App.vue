<template>
	<div id="app">
		<AppContent/>
		<AppFooter/>
		<AppModal/>
	</div>
</template>

<script>
import AppContent from "../src/components/AppContent";
import AppFooter from "../src/components/AppFooter";
import AppModal from "@/components/AppModal";

export default {
	name: 'App',
	components: {
		AppContent,
		AppFooter,
		AppModal
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #333;

	display: flex;
	flex-direction: column;
	width: 100vw;
	min-height: 100vh;
}
</style>
