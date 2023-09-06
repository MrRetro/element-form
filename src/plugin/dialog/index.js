/**
 * @author caijianjia
 * @date 2023-08-30 23:46
 */

import Vue from 'vue'
import DialogComponent from './index.vue'
let vm = null
const getInstance = function() {
  if(!vm) {
    // 单例模式
    vm = new Vue({
      render: h => h(DialogComponent)
    }).$mount()
    document.body.appendChild(vm.$el)
  }
  return vm.$children[0];
}
const Dialog = {
  create(options) {
    getInstance().create(options)
  },
  setFormData(data) {
    return getInstance().setFormData(data)
  },
  getFormData() {
    return getInstance().getFormData()
  },
  destroy(){
    getInstance().destroy()
  }
}

export {
  Dialog,
}

export default {
  install(Vue) {
    Vue.prototype.$dialog = {
      create: Dialog.create,
      setFormData: Dialog.setFormData,
      getFormData: Dialog.getFormData,
      destroy: Dialog.destroy,
    }
  }
}
