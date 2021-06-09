import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import { router } from './router/router'
import Master from './components/layouts/Master'
import Modal from './plugins/popup'
import store from './store/index'

import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Modal)
Vue.use(Notifications, { velocity })




new Vue({
  router,
  store,
  render: h => h(Master)
}).$mount('#app')
