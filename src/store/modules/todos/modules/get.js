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
                url: `task`
            })
            commit('todos/SET_LIST', listTask.data.data, { root: true })
            commit('todos/FILTER_TODOS', filter, { root: true })
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