<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="hadnleCommand">
        <span class="el-dropdown-link">
        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1"
          @select="handleRouter"
        >
          <template v-for="item in menu">
            <template v-if="item.router">
              <el-menu-item :index="item.router" :key="item.id">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu :key="item.id" :index="item.id + ''">
                <template slot="title">
                  <i :class="'el-icon-' + item.icon"></i>
                  <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item v-for="child in item.child" :key="child.id" :index="child.router">
                  {{child.title}}
                </el-menu-item>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      menu: [
        {
          id: 1,
          title: '仪表盘',
          icon: 'setting',
          type: 1,
          router: 'dashboard'
        },
        {
          id: 2,
          title: '后台管理',
          icon: 'menu',
          type: 1,
          child: [
            {
              id: 3,
              title: '角色管理',
              type: 2,
              router: 'manageRole'
            },
            {
              id: 4,
              type: 2,
              title: '人员管理',
              router: 'manageUser'
            },
            {
              id: 5,
              type: 2,
              title: '路由管理',
              router: 'manageRouter'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    handleRouter(name) {
      if (this.$route.name != name) {
        this.$router.push({name})
      }
    },
    hadnleCommand() {
      this.$store.commit('changeLoginStatus', 'nologged')
      this.$store.commit('changeUser', {})
      localStorage.removeItem('token')
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