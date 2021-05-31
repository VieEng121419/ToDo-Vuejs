import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import { router } from './router/router'
import Master from './components/layouts/Master'
import vuetify from '@/plugins/vuetify'
import store from './store/index'

import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'todo'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(Master)
}).$mount('#app')
