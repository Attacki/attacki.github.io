module.exports = {
    base:'/',
	title: 'Attacki',
	port:'8082',
	plugins: ['@vuepress/nprogress','@vuepress/back-to-top'],
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
    	['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
	],
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
	// 		publicPath:'http://pztfvnb6r.bkt.clouddn.com/attacki/'
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
	// 		  pulbicPath:'http://pztfvnb6r.bkt.clouddn.com/attacki/'
	// 	})
	// }
}