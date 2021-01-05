<template>
  <div>
    <button @click="handleLoading">加载</button>
    <div class="top" v-loading="true" v-loading-text="'渲染'">
    </div>
    <Folder :list="list" />
  </div>
</template>

<script>
import Folder from '@/components/folder'
export default {
  data() {
    return {
      loading: false,
      list: [
        {name: 'a1', child: [
          {name: 'a1-1'},
          {name: 'a1-2'}
        ]},
        {name: 'a2', child: [
          {name: 'a2-1'},
          {name: 'a2-2'}
        ]},
        {name: 'a3'}
      ]
    }
  },
  components: {
    Folder,
  },
  mounted () {
    setTimeout(() => {
      // this.$loading({text: '渲染中'})
    }, 1000);
  },
  methods: {
    handleLoading() {
      this.$loading()
    }
  },
}
</script>

<style lang="less" scoped>

</style>