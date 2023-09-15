// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue';

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
    path: '/profile',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'UserProfileEdit',
        component: () => import('@/views/UserProfileEdit.vue'),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: '/ranking',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Ranking',
        component: () => import('@/views/Ranking.vue'),
      },
    ]
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
    beforeEnter: authGuard,
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
    beforeEnter: authGuard,
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
    beforeEnter: authGuard,
  },
  {
    path: '/admin/users',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminUsers',
        component: () => import('@/views/AdminUsers.vue'),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: '/admin/summoners',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminSummoners',
        component: () => import('@/views/AdminSummoners.vue'),
      },
    ],
    beforeEnter: authGuard,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
