<template>
  <div>
    <h3>{{data.title}}</h3>
    <input type="number" v-model="data.status">
    <button @click="submit">提交</button>
    <button @click="test">test</button>
  </div>
</template>

<script>
import {GetOrderDetail, ChangeStatus} from '@/fetch'
  export default {
    data() {
      return {
        data: {}
      }
    },
    methods: {
      getDetail() {
        GetOrderDetail({id: this.id}).then(res => {
          this.data = res.data
        })
      },
      submit () {
        ChangeStatus(this.data).then(res => {
          if (res.status == 200) {
            alert('修改成功')
            setTimeout(() => {
              this.$router.back()
            }, 800)
          }
        })
      },
      test () {
        this.$route.meta.update = true
        console.log(this.$route)
      }
    },
    
    mounted () {
      this.id = this.$route.params.id
      this.getDetail()
    },
  }
</script>

<style lang="less" scoped>

</style>