import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import StripeCheckoutView from '../views/StripeCheckoutView.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import PaymentCancel from '../views/PaymentCancel.vue'
import ProfileView from '../views/ProfileView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import AdminProductsView from '../views/AdminProductsView.vue'
import AdminOrdersView from '../views/AdminOrdersView.vue'
import ProductFormView from '../views/ProductFormView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import OrdersView from '../views/OrdersView.vue'
import AdminUsersView from '../views/AdminUsersView.vue'

// import AdminView from '../views/AdminView.vue'

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
      meta: {
        guestOnly: true,
        title: 'Iniciar sesión'
      }
    },

    {
      path: '/registro',
      name: 'register',
      component: Register,
      meta: {
        guestOnly: true,
        title: 'Registro'
      }
    },

    {
      path: '/producto/:id',
      name: 'product-detail',
      component: ProductDetailView,
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
        title: 'Pago realizado'
      }
    },

    {
      path: '/pago/cancelado',
      name: 'payment-cancel',
      component: PaymentCancel,
      meta: {
        requiresAuth: true,
        title: 'Pago cancelado'
      }
    },

    {
      path: '/mi-perfil',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
        title: 'Mi perfil'
      }
    },

    {
      path: '/admin',
      name: 'admin',
      component: PaymentSuccess, 
      meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Panel Admin'
      }
    },
   {
      path: '/admin/productos',
      name: 'admin-products',
      component: AdminProductsView, 
      meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Gestionar productos'
      }
    },
     {
      path: '/admin/pedidos',
      name: 'admin-orders',
      component: AdminOrdersView, 
      meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Gestionar pedidos'
      }
    },
     {
      path: '/pedidos',
      name: 'orders',
      component: OrdersView, 
      meta: {
        requiresAuth: true,
        title: 'Mis pedidos'
      }
    },
    {
      path: '/admin/usuarios',
      name: 'admin-users',
      component: AdminUsersView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        title: 'Usuarios'
      }
    },
    {
      path: '/admin/pedidos/:id',
      name: 'admin-order-detail',
      component: OrderDetailView,
      meta: {
        requiresAuth: true,
        title: 'Ver pedido'
      }
    },
    {
      path: '/admin/productos/crear',
      component: ProductFormView,
        meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Nuevo producto'
      }
    },
    {
      path: '/admin/productos/:id/editar',
      component: ProductFormView,
        meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Editar producto'
      }
    },
    {
      path: '/carrito',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true }
    },
  ],

  scrollBehavior(to, from, savedPosition) {

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  }
})

/**
 * GUARD GLOBAL
 */
router.beforeEach(async (to, from, next) => {

  const auth = useAuthStore()

  try {

    
    if (to.meta.title) {
      document.title = `${to.meta.title} | Altea`
    }

    if (
      auth.token &&
      auth.isTokenExpired &&
      to.name !== 'login'
    ) {

      const refreshed = await auth.refreshToken()

      if (!refreshed) {

        await auth.logout()

        return next({
          name: 'login',
          query: {
            expired: '1'
          }
        })
      }
    }

    
    if (
      to.meta.requiresAuth &&
      !auth.isAuthenticated
    ) {

      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }

    if (
      to.meta.guestOnly &&
      auth.isAuthenticated
    ) {

      return next({
        name: 'home'
      })
    }

    /**
     * ROLES
     */


    if (to.meta.roles) {
      
      const userRole = auth.user?.role?.name

      if (
        !userRole ||
        !to.meta.roles.includes(userRole)
      ) {

        return next({
          name: 'home'
        })
      }
    }

    return next()

  } catch (error) {

    console.error(error)

    await auth.logout()

    return next({
      name: 'login'
    })
  }
})

export default router