import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/master',
      component: () => import('../layouts/default.vue'),
      redirect: '/dashboard',
      meta: {requiresAuth: true},
      children: [
        {
          path: '/dashboard',
          component: () => import('../pages/dashboard.vue'),
          name: 'dashboard',
          meta: {requiresAuth: true},
        },
        {
          path: '/articles',
          name: 'article-index',
          component: () => import('../pages/article/list.vue'),
        },
        {
          path: '/articles/create',
          name: 'article-create',
          component: () => import('../pages/article/create.vue'),
        },
        {
          path: '/articles/edit/:slug',
          name: 'article-edit',
          component: () => import('../pages/article/edit.vue'),
        },
        {
          path: '/articles/:slug',
          name: 'article-details',
          component: () => import('../pages/article/details.vue'),
        },

        {
          path: '/categories',
          name: 'category-list',
          component: () => import('../pages/category/list.vue'),
        },

        {
          path: '/categories/:slug',
          name: 'category-details',
          component: () => import('../pages/category/details.vue'),
        },

        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/login.vue'),
      meta: {requiresAuth: false},
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
      meta: {requiresAuth: false},
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue'),
      meta: {requiresAuth: false},
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
