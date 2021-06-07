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
        commit('todos/RESET_ERROR', null, { root: true })
        try {
            await Axios({
                method: 'delete',
                url: `task/${idTodo}`,
            })
            commit('todos/DELETE_TASK', idTodo, { root: true })
        }
        catch (err) {
            commit('todos/ERROR', err.response, { root: true })
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
