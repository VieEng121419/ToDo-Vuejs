import Axios from '@/plugins/api'
const state = {
}
const getters = {

}
const mutations = {

}
const actions = {
    async updateFilter({ commit }, filter) {
        commit('todos/RESET_ERROR', null, { root: true })
        commit('todos/LOADING', null, { root: true })
        try {
            const listFilter = await Axios({
                method: 'get',
                url: `task?completed=${filter.stt}`
            })
            commit('todos/FILTER_TASK', listFilter.data.data, { root: true })
            commit('todos/FILTER_TODOS', filter.filter, { root: true })
        }
        catch (err) {
            commit('todos/ERROR', err.response, { root: true })
        }
        finally {
            commit('todos/LOADED', null, { root: true })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
