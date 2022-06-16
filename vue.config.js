module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: `
					@import "@/styles/_mixins.scss";
					@import "@/styles/_helpers.scss";
					@import "@/styles/_common.scss";
				`,
			},
		},
	},
};