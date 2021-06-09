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
    error: '',
    errorData: ''
}
const getters = {
}
const mutations = {
    ERROR: (s, error) => {
        s.error = error.status + " " + error.statusText + " "
        s.errorData = error.data
    },
    RESET_ERROR: s => s.error = '',
}

export default {
    namespaced: true,
    modules,
    state,
    getters,
    mutations,
}