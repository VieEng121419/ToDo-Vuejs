import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from '../App'
import Home from '../components/layouts/Home.vue'
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'
import Logout from '../components/auth/Logout.vue'
import Profile from '../components/layouts/Profile.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/todo', name: 'todo', component: App, meta: { requiresAuth: true } },
        { path: '/register', name: 'register', component: Register, meta: { requiresVisitor: true } },
        { path: '/login', name: 'login', component: Login, meta: { requiresVisitor: true } },
        { path: '/logout', name: 'logout', component: Logout },
        { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
    ]
})