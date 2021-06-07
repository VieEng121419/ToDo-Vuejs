import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '@/plugins/api'
import { router } from '@/router/router'

Vue.use(Vuex)

const state = {
    editAlert: false
}
const getters = {

}
const mutations = {
    LOADED: state => state.editAlert = true
}
const actions = {
    async editUser({ commit }, infoEdit) {
        try {
            const newData = await Axios({
                method: 'put',
                url: `user/me`,
                data: {
                    name: infoEdit.name,
                    email: infoEdit.email,
                    password: infoEdit.password,
                    age: infoEdit.age
                }
            })
            commit('auth/SET_USER', newData.data.data, { root: true })
            router.push({ name: "todo" });
        }
        catch (err) {
            console.log(err)
        }
        finally {
            commit('LOADED')
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
