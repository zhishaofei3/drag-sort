import Vue from 'vue'
import App from './App.vue'
import VueDND from 'awe-dnd'

Vue.use(VueDND)

let app = document.querySelector("#app")
app.style.background = '#F00'


new Vue({
  el: '#app',
  render: function (h) {
    return h(App)
  }
})
