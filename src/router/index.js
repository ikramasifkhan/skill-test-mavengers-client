import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/login' },
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
          meta: {
            requiresAuth: true,
            title: 'Dashboard'
          },
        },
        {
          path: '/articles',
          name: 'article-index',
          component: () => import('../pages/article/list.vue'),
          meta: {
            requiresAuth: true,
            title: 'Article list'
          },
        },
        {
          path: '/articles/create',
          name: 'article-create',
          component: () => import('../pages/article/create.vue'),
          meta: {
            requiresAuth: true,
            title: 'Article create'
          },
        },
        {
          path: '/articles/edit/:slug',
          name: 'article-edit',
          component: () => import('../pages/article/edit.vue'),
          meta: {
            requiresAuth: true,
            title: 'Article edit'
          },
        },
        {
          path: '/articles/:slug',
          name: 'article-details',
          component: () => import('../pages/article/details.vue'),
          meta: {
            requiresAuth: true,
            title: 'Article details'
          },
        },

        {
          path: '/categories',
          name: 'category-list',
          component: () => import('../pages/category/list.vue'),
          meta: {
            requiresAuth: true,
            title: 'Category list'
          },
        },
        {
          path: '/categories/create',
          name: 'category-create',
          component: () => import('../pages/category/create.vue'),
          meta: {
            requiresAuth: true,
            title: 'Category create'
          },
        },
        {
          path: '/categories/:slug',
          name: 'category-details',
          component: () => import('../pages/category/details.vue'),
          meta: {
            requiresAuth: true,
            title: 'Category details'
          },
        },
        {
          path: '/categories/edit/:slug',
          name: 'category-edit',
          component: () => import('../pages/category/edit.vue'),
          meta: {
            requiresAuth: true,
            title: 'Category edit'
          },
        },

        {
          path: '/user',
          name: 'user-list',
          component: () => import('../pages/user/list.vue'),
          meta: {
            requiresAuth: true,
            title: 'User list'
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('../pages/home/home.vue'),
      meta: {
        requiresAuth: false,
        title: 'Home'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
      meta: {
        requiresAuth: false,
        title: 'Login'
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue'),
      meta: {
        requiresAuth: false,
        title: 'Register'
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = title
  }
  
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
