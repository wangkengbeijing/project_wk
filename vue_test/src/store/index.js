//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

// 不同的引入
// import countOptions from './modules/count'
// import personOptions from './modules/person'
import count from './modules/count'
import person from './modules/person'

// import * as modules from "./modules"//这种写法是把所有的输出包裹到modules对象里。
// import {countAbout, personAbout} from "./modules"

//应用Vuex插件
Vue.use(Vuex)



//创建并暴露store
export default new Vuex.Store({
    // modules
    // modules: {
    //     ...modules
    // }

    // modules: {
    //     countAbout,
    //     personAbout
    // }

    // modules: {
    //     countAbout:countOptions,
    //     personAbout:personOptions
    // }

    modules: {
        countAbout:count,
        personAbout:person
    }
})