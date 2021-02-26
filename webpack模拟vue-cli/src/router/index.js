import Vue from 'vue'
import VueRouter from "vue-router";
import page1 from '../views/page1.vue';
import page2 from '../views/page2.vue';
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/page1',
      component: page1
    },
    {
      path: '/page2',
      component: page2
    },
    {
      path: '*',
      redirect: '/page2'
    }
  ]
})