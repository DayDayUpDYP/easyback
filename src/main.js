// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'
import store from './store'
import http from 'axios'
import '../api/mock.js'

// echarts 引入
import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);



Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http


// 导航守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token&&to.name !='login'){
    next({name:'login'})
  }else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 全局注册store 之后可以使用$store
  store,
  router,
  components: { App },
  template: '<App/>'
})
