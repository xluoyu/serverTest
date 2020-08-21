<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="hadnleCommand">
        <span class="el-dropdown-link">
        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="setPsd">修改密码</el-dropdown-item>
        <el-dropdown-item command="out">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1"
          :router="true"
        >
          <template v-for="item in menu">
            <template v-if="item.children">
              <el-submenu :key="item.id" :index="item.id + ''">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id" :index="child.router">
                  {{child.name}}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.router" :key="item.id">
                <i class="el-icon-setting"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-form ref="register" :model="updateForm" label-width="auto" :rules="rules">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="updateForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input v-model="updateForm.checkpassword" type="password"></el-input>
        </el-form-item>
        <div class="text-r">
          <el-button @click="dialogVisible = false">返回</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
import Router from './router'
import {PostUserPsd} from './fetch/manage'
export default {
  data() {
    const validatePass = (rule, value, cb) => {
      if (value !== this.updateForm.password) {
        cb(new Error('两次输入密码不一致'))
      } else {
        cb()
      }
    }
    return {
      menu: [],
      dialogVisible: false,
      updateForm: {},
      rules: {
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur'}
        ],
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    this.handleRouter()
  },
  methods: {
    handleRouter() {
      let list = this.user.list
      let parentList = list.filter(e => e.parentId == -1)
      parentList.forEach(item => {
        let child = list.filter(e => e.parentId == item.id) || []
        if (child.length) {
          item.children = child
        }
      });
      let routes = list.reduce((pre, cur) => {
        if (!cur.router) {
          return pre
        } else {
          pre.push({
            path: cur.router,
            name: cur.name,
            component: () => import(`./views${cur.router}.vue`)
          })
          return pre
        }
      }, [])
      Router.addRoutes(routes)
      this.menu = parentList
    },
    hadnleCommand(key) {
      if (key == 'setPsd') {
        this.dialogVisible = true
      } else if (key == 'out') {
        this.$store.commit('changeLoginStatus', 'nologged')
        this.$store.commit('changeUser', {})
        localStorage.removeItem('token')
      }
    },
    handleClose (done) {
      this.updateForm = {}
      done()
    },
    submit () {
      PostUserPsd(this.updateForm).then(res => {
        if (res.status == 200) {
          this.$alert(res.data.msg)
          this.dialogVisible = false
          this.updateForm = {}
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: @BrandColor;
  color: #333;
  line-height: 60px;
}
.el-menu{
  min-height: calc(100vh - 60px);
}
.el-dropdown-link{
  color: #fff;
  cursor: pointer;
}
</style>