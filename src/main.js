import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import utils from './utils'
import http from './utils/http'
import store from './store'
import Toast from '@/components/toast'
import filters from './utils/filters'
import '@/assets/css/toast.css'

// 遍历注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 开发环境启用mock
if(process.env.NODE_ENV === 'development') require('@/mock' );

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(utils)
Vue.use(http)
Vue.use(Toast)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
