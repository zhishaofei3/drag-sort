import Vue from 'vue'
import App from './App.vue'
import VueDND from './vue-dragging'

Vue.use(VueDND)


new Vue({
  el: '#app',
  render: function (h) {
    return h(App)
  }
})
