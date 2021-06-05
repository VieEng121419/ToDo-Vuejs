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
        try {
            const infoTask = await Axios({
                method: 'post',
                url: 'task',
                data: { description }
            })
            commit('todos/ADD_TASK', infoTask.data.data, { root: true })
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
