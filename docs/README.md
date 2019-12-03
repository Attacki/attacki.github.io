---
home: true
meta:
    - name: 'description'
    - content: '记录的地方，希望能记下每天发生的有意义的事'
    - name: 'hope'
    - content: '我想承认自己，变成想成为的样子，就算卑微，但是伟大！'
description: "不轻易发怒的，胜过勇士，制服己心的，强如取城。(箴言:14:29)"
sidebar: auto
hide: yes
---

<month :monthData="monthData"></month>


<script>
module.exports = {
    data(){
        return {
            monthData:[
                {
                    month:'2019年11月',
                    links:[
                        {title:'nodejs中数据库的选择及使用',href:'/2019/11/22/'},
                        {title:'用nodejs来提供一个简单接口',href:'/2019/11/18/'},
                        {title:'nodejs创建服务器',href:'/2019/11/17/'},
                        {title:'游戏物理',href:'/2019/11/13/'},
                        {title:'Snabbdom，虚拟dom',href:'/2019/11/08/'},
                    ]
                },
                {
                    month:'2019年10月',
                    links:[
                        {title:'Vue源码探究<一>',href:'/2019/10/23/'},
                        {title:'使用Canvas画一个简单的折线图',href:'/2019/10/18/'},
                        {title:'使用vuepress搭建网站简易教程',href:'/2019/10/17/'},
                    ]
                }
            ]
        }
    }
}
</script>