import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Room from '@/views/Room.vue'
import InfoPage from '@/views/InfoPage.vue'

import i18nStrings from '@/i18nStrings'

import { escapeRegex } from '@/support'

const validInfoPages = i18nStrings.en.infoPages.map((ip) => escapeRegex(ip.id))

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: `/info/:page(${validInfoPages.join('|')})`,
    name: 'InfoPage',
    component: InfoPage,
    props: (route) => ({ page: route.params.page }),
  },
  {
    path: '/:roomId',
    name: 'Room',
    component: Room,
  },
  {
    path: '/*',
    name: 'InfoPageNotFound',
    component: InfoPage,
    props: { page: 'not-found' }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router
