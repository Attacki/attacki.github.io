module.exports = {
    base:'/',
	title: 'Attacki',
	port:'8082',
	plugins: ['@vuepress/nprogress','@vuepress/back-to-top'],
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],
	markdown: {
		lineNumbers: true
	},
	themeConfig: {
		lastUpdated: 'Last Updated', // string | boolean
		smoothScroll: true,
		nav: [
			{ text: '标签', link: '/tag/' },
		]
	},
	configureWebpack: {
		output:{
			publicPath:'http://pztfvnb6r.bkt.clouddn.com/attacki/'
		}
	},
	webpackChain:(config)=>{
		config.module
		.rule('images')
		  .test(/\.(png|jpe?g|gif)(\?.*)?$/)
		  .use('url-loader')
			.loader('url-loader')
			.options({
			  limit: inlineLimit,
			  name: `assets/img/[name].[hash:8].[ext]`,
			  pulbicPath:'http://pztfvnb6r.bkt.clouddn.com/attacki/'
		})
	}
	
}