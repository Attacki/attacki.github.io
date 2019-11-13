<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.theme-default-content
  max-width 960px !important
  margin 100px auto !important
  background-color #f0f0f0

.page 
  padding-bottom: 2rem;
  display: block;
  h1
    margin-top -3.1rem !important
</style>
