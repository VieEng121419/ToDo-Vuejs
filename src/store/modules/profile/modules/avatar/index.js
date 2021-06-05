import Vue from 'vue'
import Vuex from 'vuex'
//modules
import getAva from './modules/get'
import updateAva from './modules/update'

Vue.use(Vuex)

const modules = {
    getAva, updateAva
}
const state = () => ({

})
const getters = {

}
const mutations = {

}
const actions = {

}

export default {
    namespaced: true,
    modules,
    state: state,
    getters,
    actions,
    mutations
}