import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'

Vue.use(Vuex)

const state = {
    error: ''
}
const getters = {

}
const mutations = {
}
const actions = {
    async getListTodo({ commit }, filter) {
        commit('todos/LOADING', null, { root: true })
        try {
            const listTask = await Axios({
                method: 'get',
                url: `task?limit=${filter.limit}&skip=${filter.skip}`
            })
            commit('todos/SET_LIST', listTask.data.data, { root: true })
            commit('todos/FILTER_TODOS', filter.filter, { root: true })
        }
        catch (err) {
            commit('todos/ERROR', err.response, { root: true })
        }
        finally {
            commit('todos/LOADED', null, { root: true })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
