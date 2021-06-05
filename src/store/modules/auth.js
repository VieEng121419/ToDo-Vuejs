const state = () => ({
    accessToken: '',
    user: '',
})

const getters = {
    loggedIn: s => s.accessToken !== '',
}

const mutations = {
    SET_TOKEN: (s, token) => (s.accessToken = token),
    SET_USER: (s, user) => (s.user = user),
    DELETE_DATA: s => (s.accessToken = '', s.user = '', localStorage.removeItem('todo')),
    UPDATE_DATA: (s, newData) => {
        s.user = newData
    },
    RESET: s => Object.assign(s, state()),
}

const actions = {}

export default {
    namespaced: true,
    state: state,
    getters,
    mutations,
    actions,
}