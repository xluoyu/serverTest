<template>
  <div id="footer-bar">
    <div class="flex">
      <div class="flex-item" v-for="item in list" :key="item.name">
        <img src="{{item.src}}" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          // {name: '主页'}
        ]
      }
    },
  }
</script>

<style lang="less" scoped>

</style>