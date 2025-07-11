import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/Dashboard.vue'
import TaskList from '@/components/TaskList.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: TaskList
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.token) {
    next('/')
  } else {
    next()
  }
})

export default router