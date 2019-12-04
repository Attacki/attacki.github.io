module.exports = {
    base:'/',
	title: 'Attacki',
	port:'8082',
	plugins: ['@vuepress/nprogress','@vuepress/back-to-top'],
	markdown: {
		lineNumbers: true,
		extendMarkdown: md => {
			md.set({html: true})
			md.use(require("markdown-it-katex"))
		}
	},
	themeConfig: {
		smoothScroll: true,
		nav: [
			{ text: '标签', link: '/tag/' },
		]
	},
	// configureWebpack: {
	// 	output:{
	// 		publicPath:'http://q1cyw0v6w.bkt.clouddn.com/attacki/'
	// 	}
	// },
	// webpackChain:(config)=>{
	// 	config.module
	// 	.rule('images')
	// 	  .test(/\.(png|jpe?g|gif)(\?.*)?$/)
	// 	  .use('url-loader')
	// 		.loader('url-loader')
	// 		.options({
	// 		  limit: inlineLimit,
	// 		  name: `assets/img/[name].[hash:8].[ext]`,
	// 		  pulbicPath:'http://q1cyw0v6w.bkt.clouddn.com/attacki/'
	// 	})
	// }
}