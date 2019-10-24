---
title: '所有标签'
---

## 所有标签


<v-tag v-for="tag in tag_list" :options="tag" :search="search"></v-tag>

## 全部文章

<ul v-for="article in tag_list" class="article">
    <li>{{article}}</li>
</ul>

<script>
module.exports = {
    data(){
        return {
            tag_list:[
                {tagName:'All',title:'全部',articles:10},
                {tagName:'Vue',title:'Vue',articles:10},
                {tagName:'Js',title:'Js',articles:8},
                {tagName:'React',title:'React',articles:12},
                {tagName:'Git',title:'Git',articles:12},
                {tagName:'NodeJs',title:'NodeJs',articles:12},
                {tagName:'Ajax',title:'Ajax',articles:12},
                {tagName:'Express',title:'Express',articles:12},
                {tagName:'Koa',title:'Koa',articles:12},
                {tagName:'Canvas',title:'Canvas',articles:12},
                {tagName:'WebGl',title:'WebGl',articles:12},
                {tagName:'Gulp',title:'Gulp',articles:12},
                {tagName:'Webpack',title:'Webpack',articles:12},
                {tagName:'Python',title:'Python',articles:12},
                {tagName:'Other',title:'其他',articles:12},
            ]
        }
    },
    methods:{
        search(tag){
            console.log(tag)
        }
    },
    mounted(){
        console.log(this.$site)
    }
}

</script>

<style lang="stylus">
.article
    p
        color:red

</style>