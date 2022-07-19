<template>
  <el-container class="container">
    <!-- top部分 -->
    <el-header>
      <div class="left">
        <img src="@/assets/LOGO.png" alt="" />
        <span>博鹰后台管理系统</span>
      </div>
      <!-- 退出不仅要跳转，还要清除token -->
      <button @click="$router.push('/login')">退出</button>
    </el-header>
    <el-container>
      <!-- 主体部分 -->
      <!-- 左侧内容 -->
      <el-aside :style="isCollapse ? 'width:200px' : 'width:65px'">
        <!-- 按钮 -->
        <div class="anniu">
          <button
            @click="isCollapse = !isCollapse"
            :class="isCollapse ? 'big' : 'small'"
          >
            |||
          </button>
        </div>
        <!-- 左侧列表 -->
        <el-menu
          :collapse-transition="false"
          :router="true"
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :collapse="!isCollapse"
        >
          <el-submenu
            :index="`${index}`"
            v-for="(item, index) in list"
            :key="item.id"
            ><!-- icon图标 -->
            <template slot="title">
              <i :class="item.order === 1 ? 'el-icon-user-solid' : ''"></i>
              <i :class="item.order === 2 ? 'el-icon-s-check' : ''"></i>
              <i :class="item.order === 3 ? 'el-icon-s-goods' : ''"></i>
              <i :class="item.order === 4 ? 'el-icon-s-order' : ''"></i>
              <i :class="item.order === 5 ? 'el-icon-s-platform' : ''"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <!-- 存储路径 -->
            <el-menu-item
              :index="`/${childlist.path}`"
              v-for="childlist in item.children"
              :key="childlist.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ childlist.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
              </template> </el-menu-item
            ><el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <!-- 一级路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from '@/api/menus'
// 一级 el-menu -> el-menu-item
// 二级 el-menu -> el-submenu -> el-menu
// 组件名就是类名
export default {
  created () {
    this.menus()
  },
  data () {
    return {
      isCollapse: true,
      list: [], // 左侧一级列表
      childlist: [] // 左侧二级列表
    }
  },
  methods: {
    // 左侧权限
    async menus () {
      try {
        const res = await menus()
        console.log(res)
        this.list = res.data.data
      } catch (err) { console.log(err) }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #06263b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 291px;
      height: 56px;
      img {
        width: 61px;
        height: 56px;
        border-radius: 50%;
      }
      span {
        font-size: 22px;
        margin: 0 0 0 10px;
        color: #fff;
      }
    }
    button {
      width: 70px;
      height: 40px;
      background-color: #fff;
      color: #606266;
      font-size: 14px;
      border-radius: 10%;
    }
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
/* 按钮 */
.anniu {
  margin-top: -2px;
  .big {
    width: 200px;
    height: 40px;
    background-color: #ff69b4;
    letter-spacing: 5px;
    color: #fff;
  }
  .small {
    width: 65px;
    height: 40px;
    background-color: #ff69b4;
    letter-spacing: 5px;
    color: #fff;
  }
}
.el-main {
  padding: 20px;
}
</style>
