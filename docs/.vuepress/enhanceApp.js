export default ({
    Vue, // 当前 VuePress 应用所使用的 Vue 版本
    options, // 根 Vue 实例的选项
    router, // 应用程序的路由实例
    siteData // 网站元数据
}) => {
    // ...使用应用程序级别的增强功能
    options.mounted=()=>{
        window.addEventListener('resize',()=>{
            document.body.style.minHeight = document.documentElement.clientHeight + 'px'
        })
        if(document.createEvent) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("resize", true, true);
            window.dispatchEvent(event);
        } else if(document.createEventObject) {
            window.fireEvent("onresize");
        }
    }
    router.beforeEach((to, from, next) => {
        window.onresize = null
        next()
    })
}