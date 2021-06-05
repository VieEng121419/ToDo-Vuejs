import Vue from 'vue'
import Vuex from 'vuex'
//modules
import login from './modules/login'
import logout from './modules/logout'
import register from './modules/register'

Vue.use(Vuex)

const modules = {
    login, logout, register
}
const state = {
}
const getters = {
}
const mutations = {
    REMOVE_TOKEN: state => {
        state.token = null
    }
}

export default {
    namespaced: true,
    modules,
    state,
    getters,
    mutations,
}