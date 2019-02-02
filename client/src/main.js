import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faReceipt, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Overview from './components/Overview.vue'
import NewReceipt from './components/NewReceipt.vue'
import Statistics from './components/Statistics.vue'

const routes = [
  { path: '/', component: Overview },
  { path: '/new-receipt', component: NewReceipt },
  { path: '/statistics', component: Statistics }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(VueRouter)

library.add(faTachometerAlt, faReceipt, faChartLine)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')