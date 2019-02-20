import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import Dashboard from './components/Dashboard.vue'

//Defining the routes
const routes = [
  { path: '/', component: Dashboard }
]

//Config of the routing
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "",
  routes
})

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
