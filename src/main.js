import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';
import './plugins/element.js';
import echarts from 'echarts';


Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
