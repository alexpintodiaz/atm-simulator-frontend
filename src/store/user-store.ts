import { Account, User } from '../api/interfaces/users-api'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { fetchApi } from '../api/api-instance'

interface UserState {
  id: string
  name: string
  email: string
  phone?: number
  accounts: Account[]
  setName: (name: string) => void
  setEmail: (email: string) => void
  setPhone: (phone: number) => void
  setUser: (user: User) => void
  updateAccountBalance: (index: number, newBalance: number) => void
  getUsers: () => Promise<unknown>
  clearStore: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => {
        return {
          id: '',
          name: '',
          email: '',
          phone: undefined,
          accounts: [],
          setName: (name: string) => set({ name }),
          setEmail: (email: string) => set({ email }),
          setPhone: (phone: number) => set({ phone }),
          setUser: (user: User) => set({ ...user }),
          updateAccountBalance: (index: number, newBalance: number) => {
            set((state) => ({
              ...state,
              accounts: state.accounts.map((account, i) =>
                i === index ? { ...account, balance: newBalance } : account,
              ),
            }))
          },
          getUsers: async () => {
            const { data } = await fetchApi({
              endpoint: '/user',
              method: 'GET',
            })
            return data
          },
          clearStore: () =>
            set({
              id: '',
              name: '',
              email: '',
              phone: undefined,
              accounts: [],
            }),
        }
      },
      {
        name: 'user-store-z',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
)
