import Axios from '@/plugins/api'
import { router } from '@/router/router'



const state = {
    outAlert: false,
    loading: false
}
const getters = {
}
const mutations = {
    LOADED: state => (state.outAlert = true),
}
const actions = {
    async logoutUser({ commit }) {
        try {
            await Axios({
                method: 'post',
                url: 'user/logout',
            })
            commit('auth/DELETE_DATA', null, { root: true })
            router.push({ name: "login" });
        }
        catch (err) {
            console.log(err)
        }
        finally {
            commit('LOADED')
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