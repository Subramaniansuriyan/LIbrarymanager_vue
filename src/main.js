import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.interceptors.request.use(

  (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization =` JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

router.beforeEach((to, from, next) => {
  if(to.name === "Sign In"){
    let token = localStorage.getItem('token');
    if(token){
      next({
        path: '/'
      });
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = localStorage.getItem('token');
    if (!token) {
      next({
          path: '/'
      });
    }
    else {
      next();
    }
  }else {
    next();
  }
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
