import Vue from 'vue';
import VueRouter from 'vue-router'; //VueRouterのインポート
import App from './App.vue';
import { routes } from './routes'; //routes.jsのインポート
import store from './store';
// import { sync } from 'vuex-router-sync';

//bootstrapのインポート
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

// sync(store, router);  //routerとstoreを紐付け

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
