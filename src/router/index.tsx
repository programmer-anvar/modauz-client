import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Dashboard from '../pages/Admin/Dashboard'
import AdminProducts from '../pages/Admin/Products'
import AdminOrders from '../pages/Admin/Orders'
import Checkout from '../pages/Checkout'
import Orders from '../pages/Orders'
import Profile from '../pages/Profile'

// ========================
// Protected Route
// Login bo'lmagan → /login ga yuboradi
// ========================
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthStore()
  return isAuth ? <>{children}</> : <Navigate to='/login' />
}

// ========================
// Guest Route
// Login bo'lgan → / ga yuboradi
// ========================
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthStore()
  return !isAuth ? <>{children}</> : <Navigate to='/' />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
    // Login bo'lmagan → /login ga yuboriladi
  },
  {
    path: '/login',
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    )
  },
  {
    path: '/register',
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    )
  },
  {
    path: '/products',
    element: <Products />
  },
  {
  path: '/products/:id',
  element: <ProductDetail />
},
{
  path: '/cart',
  element: <Cart />
},
{
   path: '/admin',
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
},
{
  path: '/admin/products',
  element: (
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  )
},
{
  path: '/admin/orders',
  element: (
    <ProtectedRoute>
      <AdminOrders />
    </ProtectedRoute>
  )
},
{
  path: '/checkout',
  element: (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  )
},
{
  path: '/orders',
  element: (
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  )
},
{
  path: '/profile',
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  )
}
])

export default router