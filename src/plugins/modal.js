import AppModal from "@/components/AppModal";

const Modal = {
    install(Vue) {
        this.eventBus = new Vue()
        Vue.component('modal', AppModal)

        Vue.prototype.$modal = {
            showModal() {
                Modal.eventBus.$emit('showModal')
            }
        }
    }
}

export default Modal