import Vue from 'vue'
import Vuex from 'vuex'
//modules
import getList from './modules/get'
import getAll from './modules/get-all'
import editTask from './modules/edit'
import deleteTask from './modules/delete'
import addTask from './modules/add'
import filterTask from './modules/filter'

Vue.use(Vuex)

const modules = {
    getList, editTask, deleteTask, addTask, filterTask, getAll
}
const state = () => ({
    todos: [],
    filter: 'all',
    error: '',
    count: 0,
    pageIndex: null,
    loading: false
})
const getters = {
}
const mutations = {
    SET_LIST: (s, todos) => {
        s.todos = todos.reverse()
    },
    COUNT_TASK: (s, count) => s.count = count,
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
    },
    UPDATE_PAGE: s => { s.pageIndex = 1 },
    RESET_PAGE: s => { s.pageIndex = 0 },
    LOADING: s => s.loading = true,
    LOADED: s => s.loading = false
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