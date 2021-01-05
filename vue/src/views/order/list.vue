<template>
  <div class="wapper">
    <div class="item" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
      <h3>{{item.title}}</h3>
      <p>{{item.status}}</p>
    </div>
  </div>
</template>

<script>
  import {GetOrderList} from '@/fetch'
  export default {
    name: 'list',
    data() {
      return {
        list: []
      }
    },
    methods: {
      initOrderList() {
        GetOrderList().then(res => {
          this.list = res.data.list
          console.log('更新了')
        })
      },
      toDetail(id) {
        this.$router.push({ name: 'detail', params: { id }})
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        console.log(to)
        console.log(from)
        if (from.name == 'detail' && from.meta.update) {
          vm.initOrderList()
          from.meta.update = false
        }
      })
    },
    mounted () {
      this.initOrderList()
    },
  }
</script>

<style lang="less" scoped>
.wapper{
  background: #eee;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
.item{
  background: #fff;
  width: 100%;
  border-radius: 6px;
  padding: 6px;
  box-sizing: border-box;
  margin-bottom: 20px;
  text-align: left;
  h3{
    font-size: 18px;
  }
}
</style>