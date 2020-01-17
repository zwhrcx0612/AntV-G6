import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/icons/iconfont.css";
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
