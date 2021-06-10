import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '../App'
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
import Profile from '../components/layouts/Profile.vue'
import store from '@/store/index'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'todo', component: App, meta: { requiresAuth: true } },
        { path: '/todo', name: 'todo', component: App, meta: { requiresAuth: true } },
        { path: '/register', name: 'register', component: Register, meta: { requiresVisitor: true } },
        { path: '/login', name: 'login', component: Login, meta: { requiresVisitor: true } },
        { path: '/logout', name: 'logout', component: Logout },
        { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/loggedIn']) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters['auth/loggedIn']) {
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