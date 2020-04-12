import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Room from '../views/Room.vue'

import InfoContact from '../views/InfoContact.vue'
import InfoEv from '../views/InfoEv.vue'
import InfoHow from '../views/InfoHow.vue'
import InfoPrivacy from '../views/InfoPrivacy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/info/contact',
    name: 'InfoContact',
    component: InfoContact,
  },
  {
    path: '/info/ev',
    name: 'InfoEv',
    component: InfoEv,
  },
  {
    path: '/info/how',
    name: 'InfoHow',
    component: InfoHow,
  },
  {
    path: '/info/privacy',
    name: 'InfoPrivacy',
    component: InfoPrivacy,
  },
  {
    path: '/:roomId',
    name: 'Room',
    component: Room,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router
