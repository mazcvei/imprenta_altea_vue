import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import StripeCheckoutView from '../views/StripeCheckoutView.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentCancel from '../views/PaymentCancel.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: '/registro',
      name: 'register',
      component: Register,
      meta: { guestOnly: true }
    },
    {
      path: '/pago',
      name: 'payment',
      component: StripeCheckoutView,
      meta: {
        requiresAuth: true,
        title: 'Realizar Pago'
      }
    },
    {
      path: '/pago/exito',
      name: 'payment-success',
      component: PaymentSuccess,
      meta: {
        requiresAuth: true,
        title: 'Pago Realizado'
      }
    },
    {
      path: '/pago/cancelado',
      name: 'payment-cancel',
      component: PaymentCancel,
      meta: {
        requiresAuth: true,
        title: 'Pago Cancelado'
      }
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  }
})

/**
 * Helper: valida sesión real (mejorable si llamas backend o JWT decode)
 */
function isAuthenticated() {
  const token = localStorage.getItem('altea_login_token')
  return !!token
}

/**
 * GUARD GLOBAL
 */
router.beforeEach((to, from, next) => {

  const loggedIn = isAuthenticated()

  // Rutas protegidas
  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: 'login' })
  }

  // Evitar login/register si ya estás logueado
  if (to.meta.guestOnly && loggedIn) {
    return next({ name: 'home' })
  }

  next()
})

export default router