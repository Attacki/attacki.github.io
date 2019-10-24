<template>
<div class="a_tag" :class="options.tagName" :data-tag="options.tagName" @click="tagSearch">
    <span class="title">{{options.title}}</span>
    <span class="article">{{options.articles}}</span>
</div>
</template>

<script>
export default{
    data(){
        return{
            
        }
    },
    props:{
        options:{
            type:Object,
            require:true
        },
        search:{
            type:Function,
            require:true
        }
    },
    methods:{
        tagSearch(e){
            var tag = e.currentTarget.getAttribute('data-tag')
            this.search(tag)
        }
    },
    mounted(){
        
    }
}

</script>


<style lang="stylus">
.a_tag
    position relative
    display: inline-block 
    white-space: nowrap
    padding: 0px 7px
    line-height: 24px
    color #fff
    margin: 0 17px 10px 0
    vertical-align: bottom
    font-size: 15px
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.1));
    cursor pointer
    background-color: #eaecef
    &::after
        position absolute
        top: 0
        right: -10px
        content: ''
        width: 0
        border-left: 10px solid #eaecef
        border-top: 12px solid transparent
        border-bottom: 12px solid transparent
        cursor pointer
    &.Vue
        background-color: #42b983
        color: #fff
        &::after
            border-left: 10px solid #42b983
    &.Js
        background-color: #ffc41b
        color: #fff
        &::after
            border-left: 10px solid #ffc41b
    &.React
        background-color: #61dafb
        color: #fff
        &::after
            border-left: 10px solid #61dafb
    &.Git
        background-color: #959da5
        color: #fff
        &::after
            border-left: 10px solid #959da5
    &.NodeJs
        background-color: #7fbd00
        color: #fff
        &::after
            border-left: 10px solid #7fbd00
    &.Ajax
        background-color: #7e8b9d
        color: #fff
        &::after
            border-left: 10px solid #7e8b9d
    &.Express
        background-color: #fdfae6
        color: #717171
        &::after
            border-left: 10px solid #fdfae6
    &.Koa
        background-color: #33a0c0
        color: #fdfae6
        &::after
            border-left: 10px solid #33a0c0
    &.Canvas
        background-color: #f5afb1
        color: #fff
        &::after
            border-left: 10px solid #f5afb1
    &.WebGl
        background-color: #39cc8d
        color: #fff
        &::after
            border-left: 10px solid #39cc8d
    &.Gulp
        background-color: #d1696a
        color: #fff
        &::after
            border-left: 10px solid #d1696a
    &.Webpack
        background-color: #8dd6f9
        color: #fff
        &::after
            border-left: 10px solid #8dd6f9
    &.Python
        background-color: #317099
        color: #fff
        &::after
            border-left: 10px solid #317099
            
</style>
