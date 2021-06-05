import Axios from '@/plugins/api'
import { router } from '@/router/router'

const state = {
    logAlert: false,
}
const getters = {
}
const mutations = {
    LOADED: state => (state.logAlert = true),
}
const actions = {
    async loginUser({ commit }, user) {
        try {
            const userInfo = await Axios({
                method: 'post',
                url: 'user/login',
                data: user
            })
            commit('auth/SET_USER', userInfo.data.user, { root: true })
            commit('auth/SET_TOKEN', userInfo.data.token, { root: true })
            router.push({ name: "todo" });
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
    mutations,
}