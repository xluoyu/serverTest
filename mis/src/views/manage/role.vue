<template>
  <div>
    <div>
      <el-button type="primary" @click="addRole">添加</el-button>
    </div>
    <el-table :data="list" :stripe="true">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :hide-on-single-page="true"
      :page-size="size"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import {GetRoleList} from '@/fetch/manage'
  export default {
    data() {
      return {
        list: [],
        size: 10,
        page: 1,
        count: 0
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList() {
        GetRoleList({size:this.size,page:this.page}).then(res => {
          if (res.status == 200) {
            this.list = res.data.list
            this.count = res.data.count
          }
        })
      },
      changePage (e) {
        this.page = e
        this.getList()
      },
      addRole () {

      },
      handleEdit(e) {
        console.log(e)
      },
      handleDelete (e) {
        console.log(e)
      }
    },
  }
</script>

<style lang="less" scoped>

</style>