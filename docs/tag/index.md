---
title: '所有标签'
hide: yes
---

## 所有标签


<v-tag v-for="tag in tag_list" :options="tag" :search="search"></v-tag>

## 全部文章

<ul class="articles">
    <transition-group name="fade">
        <li v-for="article in tag_selected.articles" :key="article.key" class="article">
            <a :href="article.path">{{article.title}} </a>
        </li>
    </transition-group>
</ul>

<script>
module.exports = {
    data(){
        return {
            tag_selected:{
                tag:'all',
                articles:[]
            },
            tag_list:{
                'all':{title:'全部',articles:[],count:0},
                'js':{title:'Js',articles:[],count:0},
                'vue':{title:'Vue',articles:[],count:0},
                'react':{title:'React',articles:[],count:0},
                'git':{title:'Git',articles:[],count:0},
                'nodejs':{title:'NodeJs',articles:[],count:0},
                'ajax':{title:'Ajax',articles:[],count:0},
                'express':{title:'Express',articles:[],count:0},
                'koa':{title:'Koa',articles:[],count:0},
                'canvas':{title:'Canvas',articles:[],count:0},
                'webgl':{title:'WebGl',articles:[],count:0},
                'gulp':{title:'Gulp',articles:[],count:0},
                'webpack':{title:'Webpack',articles:[],count:0},
                'python':{title:'Python',articles:[],count:0}
            }
        }
    },
    methods:{
        search(tag){
            console.log(tag)
            tag = String(tag).toLowerCase()
            if(tag === '全部'){
                tag = 'all'
            }
            this.tag_selected.tag = this.tag_list[tag].articles
            this.tag_selected.articles = this.tag_list[tag].articles
        }
    },
    mounted(){
        console.log(this.$site)
        // window.sessionStorage.setItem('tag',this.tag_selected)
        let pages = this.$site.pages
        for(let index in pages){
            if( String(pages[index].frontmatter.hide) === 'yes' ) continue
            console.log(pages[index].frontmatter.hide === 'yes')
            var tag = pages[index].frontmatter.tag || 'all'
            tag = String(tag).toLowerCase()
            this.tag_list[tag].articles.push(pages[index])
            this.tag_list[tag].count++
        }
        this.tag_selected.articles = this.tag_list[this.tag_selected.tag].articles
    }
}

</script>

<style lang="stylus">

.articles
    display flex
    justify-content space-between
    flex-wrap wrap
    padding 10px 0px
    margin-bottom 35px
    .article
        flex-basis 46%
        margin-left: 20px

@media screen and (max-width: 768px) 
    .articles
        .article
            flex-basis 100%
</style>