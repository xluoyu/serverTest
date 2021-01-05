<template>
  <div>
    <div v-for="item in list" :key="item.name">
      <div>{{item.name}}</div>
      <folder v-if="item.child && item.child.length" :list="item.child"></folder>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'folder',
    props: {
      list: {
        type: Array,
        default: () => []
      },
    },
  }
</script>

<style lang="less" scoped>

</style>