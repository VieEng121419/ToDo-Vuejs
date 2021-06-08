import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'

Vue.use(Vuex)

const state = {
}
const getters = {

}
const mutations = {

}
const actions = {
    async removeTodo({ commit }, idTodo) {
        commit('todos/LOADING', null, { root: true })
        commit('todos/RESET_ERROR', null, { root: true })
        commit('todos/RESET_PAGE', null, { root: true })
        try {
            await Axios({
                method: 'delete',
                url: `task/${idTodo}`,
            })
            commit('todos/DELETE_TASK', idTodo, { root: true })
            commit('todos/UPDATE_PAGE', null, { root: true })
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
