import Axios from '@/plugins/api'
const state = {
}
const getters = {

}
const mutations = {
}
const actions = {
    async updateFilter({ commit }, filter) {
        try {
            const listFilter = await Axios({
                method: 'get',
                url: `task/?completed=${filter.stt}`
            })
            commit('todos/FILTER_TASK', listFilter.data.data, { root: true })
            commit('todos/FILTER_TODOS', filter.filter, { root: true })
        }
        catch (err) {
            console.log(err)
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
