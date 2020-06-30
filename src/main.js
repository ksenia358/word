import Vue from 'vue';
import App from './App.vue';
import store from './store/index'
import router from './routes';
import "./assets/styles/style.scss";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
