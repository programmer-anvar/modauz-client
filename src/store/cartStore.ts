import { create } from 'zustand'
import type { Product } from '../types'

interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface CartState {
  items: CartItem[]
  // savatdagi mahsulotlar

  addItem: (product: Product, quantity: number, size: string, color: string) => void
  // savatga qo'shish

  removeItem: (productId: string, size: string, color: string) => void
  // savatdan o'chirish

  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  // miqdorni o'zgartirish

  clearCart: () => void
  // savatni tozalash

  totalPrice: () => number
  // jami narx
  
  totalItems: () => number
  // jami mahsulotlar soni
}

export const useCartStore = create<CartState>((set, get) => ({
  items: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')!)
    : [],
  // localStorage dan savatni olamiz
  // sahifa yangilanganda savat saqlanib qoladi

  addItem: (product, quantity, size, color) => {
    const items = get().items
    // hozirgi savatni olamiz

    const existItem = items.find(
      item => item.product._id === product._id &&
              item.size === size &&
              item.color === color
    )
    // shu mahsulot, shu o'lcham, shu rang allaqachon savatda bormi?

    let newItems

    if (existItem) {
      // Bor bo'lsa — miqdorini oshiramiz
      newItems = items.map(item =>
        item.product._id === product._id &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      // Yo'q bo'lsa — yangi qo'shamiz
      newItems = [...items, { product, quantity, size, color }]
    }

    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  removeItem: (productId, size, color) => {
    const newItems = get().items.filter(
      item => !(item.product._id === productId &&
                item.size === size &&
                item.color === color)
    )
    // shu mahsulotni olib tashlaymiz

    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  updateQuantity: (productId, size, color, quantity) => {
    const newItems = get().items.map(item =>
      item.product._id === productId &&
      item.size === size &&
      item.color === color
        ? { ...item, quantity }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(newItems))
    set({ items: newItems })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  totalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    )
    // har bir mahsulot narxi × miqdori ni qo'shib boradi
  },

  totalItems: () => {
    return get().items.reduce(
      (total, item) => total + item.quantity, 0
    )
    // har bir mahsulot miqdorini qo'shib boradi
  }
}))