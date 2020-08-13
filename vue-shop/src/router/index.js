import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import Users from '../components/user/Users'
import Rights from '../components/power/Rights'
import Roles from '../components/power/Roles'
import Cate from '../components/goods/Cate'
import Params from '../components/goods/Params'
import GoodsList from '../components/goods/List'
import Add from '../components/goods/Add'
import Order from '../components/order/Order'
Vue.use(Router)

const router =  new Router({
  routes: [
    {path: '/', redirect:'login'},
    {path:'/login',component:Login},
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome',component:Welcome},
        {path:'/users',component:Users},
        {path:'/rights',component:Rights},
        {path:"/roles",component:Roles},
        {path:"/categories",component:Cate},
        {path:"/params",component:Params},
        {path:"/goods",component:GoodsList},
        {path:'/goods/add',component:Add},
        {path:'/orders',component:Order}
      ]
    },
    
  ],
  mode:'history'
})

router.beforeEach((to,from,next) => {
  //to 将要访问的路径
  //from 代表从那个路径跳转而来
  //next 是一个函数，表示放行
  // next() 放行 next('/login)强制跳转
  if(to.path === '/login')  return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})


export default router