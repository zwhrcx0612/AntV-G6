import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import element from 'element-ui'

// import '@/utils/plugins/grid.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/images/server.svg'
import '@/assets/images/server_red.svg'
import '@/assets/images/router.svg'
import '@/assets/images/computer.svg'
import '@/assets/images/cloud.svg'
import '@/assets/images/change.svg'
import '@/assets/images/base.svg'
import '@/assets/images/balance.svg'
Vue.component('v-select', vSelect)
Vue.use(element)
// import vueSelect from 'vue-select2'
Vue.config.productionTip = false
debugger
// console.log(vueSelect)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
