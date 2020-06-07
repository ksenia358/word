import Vue from 'vue'
import App from './App.vue'
import "./assets/styles/normalize.scss";
import "./assets/styles/helpers.scss";
// import "./assets/fonts/roboto/roboto.css";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
