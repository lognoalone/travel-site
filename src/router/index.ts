import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/destination/:id',
      name: 'destination',
      component: () => import('../views/DestinationView.vue')
    }
  ]
})

export default router
