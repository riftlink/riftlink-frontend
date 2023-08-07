// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/offer/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'OfferDetail',
        component: () => import('@/views/OfferDetail.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Login.vue')
  },
  {
    path: '/profile',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'UserProfileEdit',
        component: () => import('@/views/UserProfileEdit.vue'),
      },
    ],
  },
  {
    path: '/admin/offers',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminOffers',
        component: () => import('@/views/AdminOffers.vue'),
      },
    ],
  },
  {
    path: '/admin/offers/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminEditOffer',
        component: () => import('@/views/AdminEditOffer.vue'),
      },
    ],
  },
  {
    path: '/admin/offers/new',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminCreateOffer',
        component: () => import('@/views/AdminCreateOffer.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
