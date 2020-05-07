import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Room from '../views/Room.vue'

import InfoPage from '../views/InfoPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/info/:page',
    name: 'InfoPage',
    component: InfoPage,
    props: (route) => ({ page: route.params.page }),
  },
  {
    path: '/:roomId',
    name: 'Room',
    component: Room,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router
