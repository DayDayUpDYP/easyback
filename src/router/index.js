import Vue from 'vue'
import Router from 'vue-router'
import Main from '../view/Main.vue'
import Home from '../view/Home/index.vue'
import User from '../view/User/index.vue'

Vue.use(Router)

const routes = [
  {
    path: "/",
    name:'Main',
    component: Main,
    children:[
      {
        path:'/home',
        name:'home',
        component:Home
      },
      {
        path:'/user',
        name:'user',
        component:User
      }
    ]
  },
]

const router = new Router({
   mode:'history',
   routes
  
})
export default  router