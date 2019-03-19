import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
