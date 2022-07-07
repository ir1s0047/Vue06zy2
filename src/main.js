import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/iconfont.css';

import axios from 'axios';
axios.defaults.baseURL = 'https://www.escook.cn';
Vue.prototype.$axios = axios;

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  },
});

// 控制元素显示不显示
Vue.directive('premission1', (el, obj) => {
  // 控制 display的值即可
  el.style.display = obj.value > 3 ? 'none' : 'block';
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
