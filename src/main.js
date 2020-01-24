import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
// Configure l'url de toutes les requêtes
Vue.http.options.root = 'https://jsonplaceholder.typicode.com'
// Pour ajouter différents header, ici web token
Vue.http.headers.common['Authorization'] = 'Basic YXBponBhc'

// Création de la méthode after de l'intercepteur
Vue.http.interceptors.push((request, next) => {
  next(res => {
    if (request.after) {
      request.after.call(this, res)
    }
  })
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
