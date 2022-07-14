import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/users', component: () => import('@/views/Users/index.vue') }, // 用户列表
      { path: '/rights', component: () => import('@/views/Rights') }, // 权限列表
      { path: '/roles', component: () => import('@/views/Roles') }, // 角色列表
      { path: '/goods', component: () => import('@/views/Goods') }, // 商品列表
      { path: '/params', component: () => import('@/views/Params') }, // 分类参数
      { path: '/categories', component: () => import('@/views/Categories') }, // 商品分类
      { path: '/orders', component: () => import('@/views/Orders') }, // 订单列表
      { path: '/reports', component: () => import('@/views/Reports') }, // 数据报表
      { path: '/welcome', component: () => import('@/views/Welcome') } // 数据报表
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
