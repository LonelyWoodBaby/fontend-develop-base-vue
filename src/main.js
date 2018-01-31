import Vue from 'vue';
import VueRouter from "vue-router";
import Vuex from "vuex";
import Routers from './config/routers';

import App from './components/app.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

const store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
});

new Vue({
  el:"#app",
  router:router,
  store,store,
  render: h=>h(App)
})