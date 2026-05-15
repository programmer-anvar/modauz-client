// ========================
// USER
// ========================
export interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  phone?: string
  address?: string
  createdAt: string
}

// ========================
// PRODUCT
// ========================
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: 'erkaklar' | 'ayollar' | 'bolalar' | 'aksesuar'
  images: string[]
  sizes: string[]
  colors: string[]
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  badge?: 'Yangi' | 'Sale' | 'Top' | null
  createdAt: string
}

// ========================
// ORDER ITEM
// ========================
export interface OrderItem {
  product: string
  name: string
  image?: string
  price: number
  size?: string
  color?: string
  quantity: number
}

// ========================
// SHIPPING ADDRESS
// ========================
export interface ShippingAddress {
  fullName: string
  phone: string
  address: string
  city: string
}

// ========================
// ORDER
// ========================
export interface Order {
  _id: string
  user: User | string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: 'naqd' | 'karta'
  itemsPrice: number
  shippingPrice: number
  totalPrice: number
  status: 'yangi' | 'tasdiklandi' | "yo'lda" | 'yetkazildi' | 'bekor'
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
  note?: string
  createdAt: string
}

// ========================
// AUTH
// ========================
export interface AuthResponse {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  token: string
}

// ========================
// API ERROR
// ========================
export interface ApiError {
  message: string
}