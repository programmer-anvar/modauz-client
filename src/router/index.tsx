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
}
])

export default router