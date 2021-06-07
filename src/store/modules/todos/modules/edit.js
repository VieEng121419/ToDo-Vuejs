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
    async updateTodo({ commit }, infoTodo) {
        commit('todos/RESET_ERROR', null, { root: true })
        try {
            const data = await Axios({
                method: 'put',
                url: `task/${infoTodo.id}`,
                data: {
                    description: infoTodo.description,
                    completed: infoTodo.completed
                }
            })
            commit('todos/UPDATE_TASK', data.data.data, { root: true })
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
