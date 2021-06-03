import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../../plugins/api'

Vue.use(Vuex)

const state = {
    todos: [],
    token: localStorage.getItem('access_token') || null,
}
const getters = {

}
const mutations = {
    getListTodo(state, todos) {
        state.todos = todos
    },
    addTodo(state, todo) {
        state.todos.data.push(todo)
    },
    removeTodo(state, idTodo) {
        const index = state.todos.data.findIndex(todo => todo._id = idTodo)
        state.todos.data.splice(index, 1)
    },
    setToken(state, token) {
        state.token = token
    }
}
const actions = {
    getListTodo({ commit }) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'get',
                url: 'task',
                headers: {
                    Authorization: `Bearer ${state.token} `
                }
            })
                .then((res) => {
                    commit('getListTodo', res.data)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    addTodo({ commit }, description) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'post',
                url: 'task',
                headers: {
                    Authorization: `Bearer ${state.token} `
                },
                data: { description }
            })
                .then((res) => {
                    commit('addTodo', res.data.data)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    removeTodo({ commit }, idTodo) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'delete',
                url: `task/${idTodo}`,
                headers: {
                    Authorization: `Bearer ${state.token} `
                },
            })
                .then((res) => {
                    commit('removeTodo', idTodo)
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    updateTodo(context, infoTodo) {
        return new Promise((resolve, reject) => {
            Axios({
                method: 'put',
                url: `task/${infoTodo.id}`,
                headers: {
                    Authorization: `Bearer ${state.token} `
                },
                data: {
                    description: infoTodo.description,
                    completed: infoTodo.completed
                }
            })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    setToken({ commit }, token) {
        commit('setToken', token)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}