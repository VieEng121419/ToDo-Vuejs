import Vue from 'vue'
import Vuex from 'vuex'
//modules
import edit from './modules/edit'
import avatar from './modules/avatar/index'

Vue.use(Vuex)

const modules = {
    edit, avatar
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
        s.errorData = error.data.error
    },
    RESET_ERROR: s => s.error = '',
}
const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules,
}