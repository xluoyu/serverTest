<template>
  <div>
    <!-- 查询 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="父级菜单" class="search-item">
        <el-select v-model="searchForm.parentId" filterable placeholder="请选择">
          <el-option label="全部" value=''></el-option>
          <el-option
            v-for="item in allParentList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="searchForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column prop="router" label="路由"></el-table-column>
      <el-table-column prop="parentName" label="父级名称"></el-table-column>
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
    <br/>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :page-size="pageSize"
      :total="count">
    </el-pagination>
    <!-- 创建/修改弹框 -->
    <el-dialog :title="updateForm.id ? '修改路由' : '创建路由'" :visible="dialogFormVisible" width="600px">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="updateForm.name" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="router">
          <el-input v-model="updateForm.router"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单">
          <el-select v-model="updateForm.parentId" filterable placeholder="请选择">
          <el-option label="无" :value='-1'></el-option>
          <el-option
            v-for="item in allParentList"
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
import { GetRouteList, PostRouteFrom, GetAllParentRouterList, DeleteRoute } from '@/fetch/manage'
export default {
  data() {
    const valRouter = (rule, value,cb) => {
      if (this.updateForm.parentId != -1) {
        if (value == '') {
          cb(new Error('请输入路由'))
        } else {
          cb()
        }
      } else {
        cb()
      }
    }
    return {
      dialogFormVisible: false,
      searchForm: {},
      updateForm: {},
      rules: {
        name: [{ required: true, message: '请输入菜单名', trigger: 'blur' }],
        router: [{ validator: valRouter, trigger: 'blur' }]
      },
      list: [],
      allParentList: [],
      count: 0,
      pageSize: 10,
      pageIndex: 0
    }
  },
  created () {
    this.getAllList()
    this.getlist()
  },
  methods: {
    handleSearch () {
      this.getlist()
    },
    handleEdit (data) {
      this.updateForm = data
      this.dialogFormVisible = true
    },
    handleDelete (data) {
      this.$confirm(`确认删除${data.name}?`)
        .then(() => {
          DeleteRoute({id: data.id}).then((res) => {
            if (res.status == 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getlist()
              if (this.data.parentId == -1) {
                this.getAllList()
              }
            }
          })
        }).catch()
    },
    handleCreate () {
      this.dialogFormVisible = true
    },
    submit() {
      this.$refs.updateForm.validate(v => {
        if (v) {
          PostRouteFrom(this.updateForm).then(res => {
            if (res.status == 200) {
              this.$alert(res.data.msg)
              this.dialogFormVisible = false
              this.getlist()
              if (this.updateForm.parentId > 0) {
                this.getAllList()
              }
              this.updateForm = {}
            }
          })
        } else {
          console.log('error submit!!')
        }
      })
      
    },
    getlist() {
      GetRouteList({
        ...this.searchForm,
        size: this.pageSize,
        page: this.pageIndex
      }).then(res => {
        this.list = res.data.list
        this.count = res.data.count
      })
    },
    getAllList() {
      GetAllParentRouterList().then(res => {
        this.allParentList = res.data.list
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