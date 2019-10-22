module.exports = {
    base:'/',
	title: '不羁',
	port:'8082',
	plugins: ['@vuepress/nprogress','@vuepress/back-to-top'
	],
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }]
	],
	markdown: {
		lineNumbers: true
	}
}