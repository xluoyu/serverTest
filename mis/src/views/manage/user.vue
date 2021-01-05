<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="role.name" label="role"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template> -->
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :page-size="pageSize"
      :total="count">
    </el-pagination>
    <!-- 创建/修改弹框 -->
    <el-dialog title="修改角色" :visible="dialogFormVisible" width="600px">
      <el-form :model="curRow" :rules="rules" ref="curRow" label-width="80px">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="curRow.roleId" filterable placeholder="请选择">
          <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetUserList, GetRoleList, PostUseerFrom } from '@/fetch/manage'
export default {
  data() {
    return {
      curRow: {},
      list: [],
      allRoleList: [],
      rules: {
        roleId: [{ required: true, type: 'number', message: '请选择角色', trigger: 'change' }]
      },
      count: 0,
      pageSize: 10,
      pageIndex: 0,
      dialogFormVisible: false
    }
  },
  created () {
    this.getList()
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      GetRoleList({
        size: 9999,
        page: 0
      }).then(res => {
        if (res.status == 200) {
          this.allRoleList = res.data.list
        }
      })
    },
    getList() {
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
      this.getList()
    },
    handleEdit (data) {
      this.curRow = {
        id: data.id,
        roleId: data.role.id
      }
      this.dialogFormVisible = true
    },
    submit () {
      this.$refs.curRow.validate(v => {
        if (v) {
          PostUseerFrom(this.curRow).then(res => {
            if (res.status == 200) {
              this.$alert(res.data.msg)
              this.dialogFormVisible = false
              this.getList()
              this.curRow = {}
            }
          })
        }
      }) 
    }
  },
}
</script>

<style lang="less" scoped>

</style>