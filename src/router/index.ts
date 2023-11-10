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
    path: '/team/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'TeamDetail',
        component: () => import('@/views/TeamDetail.vue'),
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
    path: '/player/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'PlayerDetail',
        component: () => import('@/views/PlayerDetail.vue'),
      },
    ],
  },
  {
    path: '/admin/teams',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminTeams',
        component: () => import('@/views/AdminTeams.vue'),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: '/admin/teams/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminEditTeam',
        component: () => import('@/views/AdminEditTeam.vue'),
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: '/admin/teams/new',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdminCreateTeam',
        component: () => import('@/views/AdminCreateTeam.vue'),
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
