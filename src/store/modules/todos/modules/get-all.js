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
    async getAllList({ commit }) {
        commit('todos/LOADING', null, { root: true })
        try {
            const allList = await Axios({
                method: 'get',
                url: `task`
            })
            commit('todos/COUNT_TASK', allList.data.count, { root: true })
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
