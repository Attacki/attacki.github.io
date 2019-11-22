<template>
<div class="time_box">
    <div class="month" v-for="month in monthData">
        <h2 class="title">{{month.month}}</h2>
        <ul class="link_list">
            <li class="link" v-for="link in month.links">
                <router-link :to="link.href">{{link.title}}</router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props:['monthData']
}
</script>

<style lang="stylus" scoped>
.title
    border-bottom 1px solid #f9f9f9
    font-weight 500
.link_list
    display flex
    justify-content space-between
    flex-wrap wrap
    padding 10px 0px
    margin-bottom 35px
    .link
        flex-basis 46%
        margin-left: 20px

@media screen and (max-width: 768px) 
    .link_list
        .link
            flex-basis 100%
</style>
