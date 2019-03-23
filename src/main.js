import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueCookies from 'vue-cookies';
import './plugins/element.js';
import echarts from 'echarts';


Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
