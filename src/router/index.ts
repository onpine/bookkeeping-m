import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/login.vue'
import Rigister from '@/views/rigister.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: 'home',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: '/rigister',
    name: 'rigister',
    component: Rigister
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登陆状态
  // 如果没有登录，则跳转到登陆页面
  // 如果登陆了，则允许通过
  // 是 /login 允许通过
  const token = window.localStorage.getItem('token');
  // 校验非登录页面的登陆状态
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      // 没有登陆，跳转到登陆页面
      next('/login')
    }
  } else {
    // 登陆页面。允许通过
    next()
  }
})
export default router
