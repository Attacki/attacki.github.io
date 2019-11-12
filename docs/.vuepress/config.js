module.exports = {
    base:'pztfvnb6r.bkt.clouddn.com/',
	title: 'Attacki',
	port:'8082',
	plugins: ['@vuepress/nprogress','@vuepress/back-to-top'],
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],
	themeConfig: {
		lastUpdated: 'Last Updated', // string | boolean
		smoothScroll: true,
		nav: [
			{ text: '标签', link: '/tag/' },
		]
	}
}