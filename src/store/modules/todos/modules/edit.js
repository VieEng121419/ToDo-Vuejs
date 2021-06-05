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
    async updateTodo(context, infoTodo) {
        try {
            await Axios({
                method: 'put',
                url: `task/${infoTodo.id}`,
                data: {
                    description: infoTodo.description,
                    completed: infoTodo.completed
                }
            })

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
