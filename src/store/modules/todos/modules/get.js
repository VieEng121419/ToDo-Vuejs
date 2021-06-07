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
    async getListTodo({ commit }, filter) {
        try {
            const listTask = await Axios({
                method: 'get',
                url: `task?limit=4&skip=${filter.skip}`
            })
            commit('todos/SET_LIST', listTask.data.data, { root: true })
            commit('todos/FILTER_TODOS', filter.filter, { root: true })
        }
        catch (err) {
            console.log(err)
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
