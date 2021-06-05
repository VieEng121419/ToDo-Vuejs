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
        try {
            await Axios({
                method: 'delete',
                url: `task/${idTodo}`,
            })
            commit('todos/DELETE_TASK', idTodo, { root: true })
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
