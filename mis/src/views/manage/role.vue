<template>
  <div>
    <div>
      <el-button type="primary" @click="handleEdit({})">添加</el-button>
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
        </template> -->
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :hide-on-single-page="true"
      :page-size="size"
      :total="count">
    </el-pagination>
    <el-dialog :title="updateForm.id ? '修改角色' : '创建角色'" :visible="dialogFormVisible" @opened="handleRoleRouter">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="updateForm.name" autocomplete="on" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <el-table
        :data="routerList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        ref="routerTable"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @select-all="seletcAll"
        @select="selectItem"
        @selection-change="handleSelected"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="router"
          label="路由">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {GetRoleList, GetRouteList, PostRoleFrom, DeleteRole} from '@/fetch/manage'
  export default {
    data() {
      return {
        list: [],
        routerList: [],
        updateForm: {},
        rules: {
          name: [{ required: true, message: '请输入菜单名', trigger: 'blur' }],
        },
        dialogFormVisible: false,
        size: 10,
        page: 1,
        count: 0,
      }
    },
    created () {
      this.getList()
      this.getRouteList()
    },
    methods: {
      getRouteList() {
        GetRouteList({
          size: 9999,
          page: 0
        }).then(res => {
          if (res.status == 200) {
            let list = res.data.list
            let routerList = list.filter(e => e.parentId == -1)
            routerList.forEach(item => {
              let child = list.filter(e => e.parentId == item.id) || []
              if (child.length) {
                item.children = child
              }
            });
            this.routerAllList = list
            this.routerList = routerList
          }
        })
      },
      getList() {
        GetRoleList({size:this.size,page:this.page}).then(res => {
          if (res.status == 200) {
            this.list = res.data.list
            this.count = res.data.count
          }
        })
      },
      selectItem(selection, row) {
        if (row.children) {
          row.children.forEach(item => {
            this.$refs.routerTable.toggleRowSelection(item, selection.indexOf(row) != -1)
          })
        }
      },
      seletcAll (selection) {
        let arr = this.routerAllList.filter(e => selection.findIndex(a => a.id == e.id) == -1)
        let isParent = false
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].parentId == -1) {
            isParent = true
          } else {
            isParent = false
            break
          }
        }
        if (!isParent) {
          arr.forEach(item => {
            this.$refs.routerTable.toggleRowSelection(item, true)
          })
        } else {
          this.$refs.routerTable.clearSelection()
        }
      },
      handleSelected (selection) {
        this.selected = selection
      },
      submit () {
        let data = {
          id: this.updateForm.id || '',
          name: this.updateForm.name,
          list: this.selected.map(e => e.id)
        }
        PostRoleFrom(data).then(res => {
          if (res.status == 200) {
            this.$alert(res.data.msg)
            this.dialogFormVisible = false
            this.getList()
            this.updateForm = {}
          }
        })
      },
      changePage (e) {
        this.page = e
        this.getList()
      },
      handleEdit(data = {}) {
        this.dialogFormVisible = true
        if (data.id) {
          this.updateForm = Object.assign({}, data)
        }
      },
      handleRoleRouter () {
        if (this.updateForm.id) {
          let useList = this.updateForm.list.map(e => e.id)
          let arr = this.routerAllList.filter(e => useList.indexOf(e.id) != -1)
          arr.forEach(item => {
            this.$refs.routerTable.toggleRowSelection(item, true)
          })
        }
      },
      handleDelete (data) {
        this.$confirm(`确认删除${data.name}?`)
        .then(() => {
          DeleteRole({id: data.id}).then((res) => {
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
      }
    },
  }
</script>

<style lang="less" scoped>

</style>