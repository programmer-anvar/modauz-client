import { create } from "zustand";
import type { User } from "../types";

interface AuthState  {
    user: User | null
    token: string | null
    isAuth: boolean

    setAuth: (user: User, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState >((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    token: localStorage.getItem('token') || null,
    isAuth: !!localStorage.getItem('token'),

    setAuth: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        set({ user, token, isAuth: true })
    },
    logout: () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuth: false})
    }
}))