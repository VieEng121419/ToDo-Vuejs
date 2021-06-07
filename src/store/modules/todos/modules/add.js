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
    async addTodo({ commit }, description) {
        commit('todos/RESET_ERROR', null, { root: true })
        try {
            const infoTask = await Axios({
                method: 'post',
                url: 'task',
                data: { description }
            })
            commit('todos/ADD_TASK', infoTask.data.data, { root: true })
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
