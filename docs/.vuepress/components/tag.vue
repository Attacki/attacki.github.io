<template>
<div class="tag" :class="options.tagName" :data-tag="options.tagName" @click="tagSearch">
    <span class="title">{{options.title}}</span>
    <span class="article">{{options.articles}}</span>
</div>
</template>

<script>
export default{
    data(){
        return{
            start:'love',
            count:0
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
.tag
    position relative
    display: inline-block 
    white-space: nowrap
    padding: 0px 7px
    line-height: 28px
    color #fff
    margin-right: 17px
    vertical-align: bottom
    font-size: 15px
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));
    cursor pointer
    background-color: #eaecef
    &::after
        position absolute
        top: 0
        right: -10px
        content: ''
        width: 0
        border-left: 10px solid #eaecef
        border-top: 14px solid transparent
        border-bottom: 14px solid transparent
        cursor pointer
    &.Vue
        background-color: #42b983
        color: #fff
        &::after
            border-left: 10px solid #42b983
    &.Js
        background-color: #ff9e00
        color: #fff
        &::after
            border-left: 10px solid #ff9e00
    &.React
        background-color: #61dafb
        color: #fff
        &::after
            border-left: 10px solid #61dafb
</style>
