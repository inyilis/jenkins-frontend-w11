import Vue from 'vue'
import App from './App.vue'
import routers from './routes'
import stores from './store'

Vue.config.productionTip = false

new Vue({
  store: stores,
  router: routers,
  render: h => h(App),
}).$mount('#app')
