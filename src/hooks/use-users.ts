import { toast } from 'keep-react'
import { authApi } from '../api/auth-api'
import { AuthPayload } from '../api/interfaces/auth-api'
import { useAppNavigate } from './use-app-navigate'
import { UserPayload } from '../components/user-form'
import { usersApi } from '../api/users-api'
import { useState } from 'react'
import { useUserStore } from '../store/user-store'
import { AxiosError } from 'axios'

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
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message[0])
      }
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
      if (error instanceof AxiosError) {
        error.response?.status === 400
          ? toast.error('Invalid email or password')
          : toast.error(error.response?.data.message)
      }
      console.error(['authenticateUser', error])
    }
  }

  return {
    isLoading,
    createNewUser,
    authenticateUser,
  }
}
