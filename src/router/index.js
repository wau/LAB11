import Vue from 'vue'
import VueRouter from 'vue-router'
import  Home from '@/views/Home.vue'
import  Shop from '@/views/Shop.vue'
import  Basket from '@/views/Basket.vue'
import  Register from '@/views/Register.vue'
import  Login from '@/views/Login.vue'
import  Logout from '@/views/Logout.vue'
import  MyOrders from '@/views/MyOrders.vue'
import  Message from '@/views/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/shop',
    component: Shop
  }, 
  {
    path: '/basket',
    component: Basket
  }, 
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout
  }, 
  {
    path: '/myorders',
    component: MyOrders
  }, 
  {
    path: '/message/:id',
    component: Message
  },        
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
