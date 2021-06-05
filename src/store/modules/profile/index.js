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

}
const getters = {

}
const mutations = {

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