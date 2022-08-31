//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入插件
import vueResource from 'vue-resource'
//引入store
import store from './store'
// import { setTimeout } from 'core-js'
// import axios from 'axios'
// import { HttpRequest } from './utils/http.js';

//关闭Vue的生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
// 	return routerPush.call(this, location).catch(error => error)
// }
//使用插件
Vue.use(vueResource)

//创建vm
new Vue({
	el: '#app',

	render: h => h(App),
	router:router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
})
