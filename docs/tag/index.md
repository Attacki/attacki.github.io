---
title: '所有标签'
hide: yes
link:
    - rel: stylesheet
    - href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css
---

## 所有标签


<v-tag v-for="tag in tag_list" :options="tag" :check="tag_selected.tag" :search="search"></v-tag>

## 全部文章

<div>
    <transition-group tag="div" class="articles" name="fade">
        <li v-for="article in tag_selected.articles" :key="article.key" class="article">
            <a :href="article.path">{{article.title}} </a>
        </li>
    </transition-group>
</div>

<script>
module.exports = {
    data(){
        return {
            tag_selected:{
                tag:'all',
                articles:[]
            },
            tag_list:{
                'all':{title:'All',articles:[],count:0},
                'js':{title:'Js',articles:[],count:0},
                'vue':{title:'Vue',articles:[],count:0},
                'react':{title:'React',articles:[],count:0},
                'git':{title:'Git',articles:[],count:0},
                'nodejs':{title:'NodeJs',articles:[],count:0},
                'typescript':{title:'TypeScript',articles:[],count:0},
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
            window.sessionStorage.setItem('tag',tag)
            this.tag_selected.tag = tag
            this.tag_selected.articles = this.tag_list[tag].articles
        }
    },
    mounted(){
        let pages = this.$site.pages
        try{
            var last_tag = window.sessionStorage.getItem('tag')
            if(!!last_tag){
                this.tag_selected.tag = last_tag
            }
        }catch(err){
            console.log(err)
        }
        for(let index in pages){
            if( String(pages[index].frontmatter.hide) === 'yes' ) continue
            var tag = pages[index].frontmatter.tag || 'all'
            tag = String(tag).toLowerCase()
            this.tag_list[tag].articles.push(pages[index])
            this.tag_list[tag].count++
            if(tag !== 'all'){
                this.tag_list.all.articles.push(pages[index])
                this.tag_list.all.count++
            }
        }
        this.tag_selected.articles = this.tag_list[this.tag_selected.tag].articles
    }
}

</script>

<style lang="stylus">

.articles
    position relative
    padding 10px 0px
    .article
        padding 5px 0px
        transition: all .5s
</style>