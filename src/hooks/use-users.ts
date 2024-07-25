import { UserPayload } from '../components/user-form'
import { usersApi } from '../api/users-api'
import { useUserStore } from '../store/user-store'
import { useAppNavigate } from './use-app-navigate'
import { useState } from 'react'
import { AuthPayload } from '../api/interfaces/auth-api'
import { authApi } from '../api/auth-api'

export const useUsers = () => {
  const navigate = useAppNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const { setUser } = useUserStore()

  const createNewUser = async (newUser: UserPayload) => {
    setIsLoading(true)

    try {
      const resp = await usersApi.postUser(newUser)

      setUser(resp)

      setIsLoading(false)

      navigate('/dashboard')
    } catch (error) {
      setIsLoading(false)
      console.error(['createNewUser', error])
    }
  }

  const authenticateUser = async (payload: AuthPayload) => {
    setIsLoading(true)

    try {
      const resp = await authApi.authenticateUser(payload)

      setUser(resp)

      setIsLoading(false)

      navigate('/dashboard')
    } catch (error) {
      setIsLoading(false)
      console.error(['authenticateUser', error])
    }
  }

  return {
    isLoading,
    createNewUser,
    authenticateUser,
  }
}
