import Vue from 'vue'
import Router from 'vue-router'
import Main from '../view/Main.vue'
import Home from '../view/Home/index.vue'
import User from '../view/User/index.vue'
import Mall from '../view/Mall/index.vue'
import Pageone from '../view/Other/Page1.vue'
import Pagetwo from '../view/Other/Page2.vue'

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      },
      {
        path:'/mall',
        name:'mall',
        component:Mall
      },
      {
        path:'/page1',
        name:'page1',
        component:Pageone
      },
      {
        path:'/page2',
        name:'page2',
        component:Pagetwo
      }
    ]
  },
]

const router = new Router({
   mode:'history',
   routes
  
})
export default  router