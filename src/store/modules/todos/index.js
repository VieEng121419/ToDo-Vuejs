import Vue from 'vue'
import Vuex from 'vuex'
//modules
import getList from './modules/get'
import editTask from './modules/edit'
import deleteTask from './modules/delete'
import addTask from './modules/add'
import filterTask from './modules/filter'

Vue.use(Vuex)

const modules = {
    getList, editTask, deleteTask, addTask, filterTask
}
const state = () => ({
    todos: [],
    filter: 'all',
    error: ''
})
const getters = {
}
const mutations = {
    SET_LIST: (s, todos) => {
        s.todos = todos.reverse()
    },
    ADD_TASK: (s, task) => s.todos.unshift(task),
    DELETE_TASK(s, id) {
        const index = s.todos.findIndex(todo => todo._id == id)
        s.todos.splice(index, 1)
    },
    FILTER_TASK: (s, filter) => {
        s.todos = filter.reverse()
    },
    FILTER_TODOS: (s, filter) => {
        s.filter = filter
    },
    ERROR: (s, error) => {
        s.error = error.status + " " + error.statusText
    },
    RESET_ERROR: s => s.error = '',
    UPDATE_TASK: (s, newData) => {
        const index = s.todos.findIndex(todo => todo._id === newData._id)
        s.todos.splice(index, 1, newData)
    }
}
const actions = {

}

export default {
    namespaced: true,
    modules,
    state: state,
    getters,
    actions,
    mutations
}