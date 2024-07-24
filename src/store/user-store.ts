import { create } from 'zustand'
import { fetchApi } from '../api/api-instance'

interface UserState {
    id: string
    name: string
    email: string
    phone?: number
    setName: (name: string) => void
    setEmail: (email: string) => void
    setPhone: (phone: number) => void
    getUsers: () => void
    clearStore: () => void
}

export const useUserStore = create<UserState>((set) => ({
    id: '',
    name: '',
    email: '',
    phone: 0,
    setName: (name: string) => set({ name }),
    setEmail: (email: string) => set({ email }),
    setPhone: (phone: number) => set({ phone }),
    getUsers: async () => {
        const { data } = await fetchApi({
            endpoint: '/user',
            method: 'GET',
        })
        console.log(data)
        return data
    },
    clearStore: () => set({id: '', name: '', email: '', phone: 0 }),
}))