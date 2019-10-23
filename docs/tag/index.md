---
title: '所有标签'
---

## 所有标签


<tag v-for="tag in tag_list" :options="tag" :search="search"></tag>

## 全部文章
<ul v-for="article in tag_list" class="article">
    <li>{{article}}</li>
</ul>

<script>
module.exports = {
    data(){
        return {
            tag_list:[
                {tagName:'Vue',title:'Vue',articles:10},
                {tagName:'Js',title:'Js',articles:8},
                {tagName:'React',title:'React',articles:12},
                {tagName:'Faith',title:'信仰',articles:1},
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