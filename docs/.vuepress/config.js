module.exports = {
    base:'/',
	title: '不羁',
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
	}
}