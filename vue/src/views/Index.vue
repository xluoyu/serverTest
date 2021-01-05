<template>
  <div id="vue">
    <div class="flex">
      <router-link :to="{name: item.name}" v-for="item in list" :key="item.name">
        <img :src="item.photo" alt="">
        <span>{{item.title}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{title: '小商城', name: 'Shop', photo: ''}]
      }
    },
  }
</script>

<style lang="less" scoped>
a{
  display: block;
}
</style>