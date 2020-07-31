<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="role" label="role"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :page-size="pageSize"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { GetUserList } from '@/fetch/manage'
export default {
  data() {
    return {
      list: [],
      count: 0,
      pageSize: 2,
      pageIndex: 0
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist() {
      GetUserList({
        size: this.pageSize,
        page: this.pageIndex
      }).then(res => {
        this.list = res.data.list
        this.count = res.data.count
      })
    },
    changePage(e) {
      this.pageIndex = e
      this.getlist()
    }
  },
}
</script>

<style lang="less" scoped>

</style>