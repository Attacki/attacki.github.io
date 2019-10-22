<template>
<div class="like" @click="plus">
    {{start}}{{count}}
    <p>
        {{options.love}}
    </p>
</div>
</template>

<script>
module.exports = {
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
        }
    },
    methods:{
        plus(){
            this.count++
        }
    },
    mounted(){
        
    }
}

</script>


<style lang="stylus">

</style>
