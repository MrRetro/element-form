// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import vueHljs from 'vue-hljs'
import 'vue-hljs/dist/vue-hljs.min.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import md5 from 'js-md5'
import router from './router'
import Dialog from './plugin/dialog'

/* eslint-disable */
Vue.use(vueHljs)
// Vue.use(ElementUI)
Vue.use(Dialog)

/* eslint-disable */
Vue.config.productionTip = false
Vue.prototype.$md5 = md5

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
