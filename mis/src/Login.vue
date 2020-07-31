<template>
  <div id="app">
    <Manage v-if="loginStatus === 'logged'"></Manage>
    <div id="login" v-if="loginStatus === 'nologged'">
      <div class="main">
        <h2 class="text-c">登录</h2>
        <el-form ref="form" :model="form" label-width="auto" v-if="status">
          <el-form-item label="账号">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <div class="text-r">
            <el-button @click="changeStatus">注册</el-button>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </div>
        </el-form>
        <el-form ref="register" :model="registerData" label-width="auto" :rules="rules" v-else>
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpassword">
            <el-input v-model="registerData.checkpassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="registerData.code"></el-input>
          </el-form-item>
          <div class="text-r">
            <el-button @click="changeStatus">返回</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, GetUser, Register } from '@/fetch/manage'
import Manage from './App'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components: {
    Manage
  },
  data() {
    const validatePass = (rule, value, cb) => {
      if (value !== this.registerData.password) {
        cb(new Error('两次输入密码不一致'))
      } else {
        cb()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      registerData: {
        username: '',
        password: '',
        checkpassword: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur'}
        ],
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      },
      status: true
    }
  },
  computed: {
    ...mapState([
      'loginStatus'
    ])
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.getUser()
    } else {
      this.$store.commit('changeLoginStatus', 'nologged')
    }
  },
  methods: {
    handleLogin() {
      Login(this.form).then(res => {
        if (res.status == 200) {
          this.$store.commit('changeLoginStatus', 'logged')
          this.$store.commit('changeUser', res.user)
          localStorage.setItem('token', res.token)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getUser() {
      GetUser().then(res => {
        if (res.status == 200) {
          this.$store.commit('changeLoginStatus', 'logged')
          this.$store.commit('changeUser', res.user)
          localStorage.setItem('token', res.token)
        } else {
          this.$store.commit('changeLoginStatus', 'nologged')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeStatus() {
      this.status = !this.status
    },
    submit() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          Register(this.registerData).then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.$alert('注册成功')
              this.changeStatus()
            }
          })
        } else {
          this.$message.error('发生错误')
          return false
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
#login{
  width: 100vw;
  height: 100vh;
  background: #eee;
}
.main{
  width: 400px;
  padding: 20px;
  border-radius: @border-radius;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
  h2{
    margin: 10px;
  }
}
</style>