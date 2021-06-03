import Axios from 'axios'

const baseURL = "https://api-nodejs-todolist.herokuapp.com";
const api = Axios.create({ baseURL })

export default api