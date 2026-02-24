import { createRouter, createWebHistory } from 'vue-router'
import en from '@/i18n/en'
import { escapeRegex } from '@/utils/support'

import HomeView from '@/views/HomeView.vue'
import RoomView from '@/views/RoomView.vue'
import InfoPageView from '@/views/InfoPageView.vue'

const validInfoPages = en.infoPages.map((ip) => escapeRegex(ip.id))

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: `/info/:page(${validInfoPages.join('|')})`,
    name: 'InfoPage',
    component: InfoPageView,
    props: (route: { params: { page: string } }) => ({ page: route.params.page }),
  },
  {
    path: '/:roomId',
    name: 'Room',
    component: RoomView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'InfoPageNotFound',
    component: InfoPageView,
    props: { page: 'not-found' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
