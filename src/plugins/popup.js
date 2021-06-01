import AppModal from '../components/layouts/Popup.vue'

const Modal = {
    install(Vue) {
        this.EventBus = new Vue()
        Vue.component('popup', AppModal)
        Vue.prototype.$modal = {
            show(params) {
                Modal.EventBus.$emit('show', params)
            }
        }
    }
}
export default Modal