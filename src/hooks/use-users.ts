import { useCallback, useState } from 'react'
import { UserPayload } from '../components/user-form'
import { usersApi } from '../api/users-api'

export const useUsers = () => {
  const [loading, setLoading] = useState(false)

  const [createdUser, setCreatedUser] = useState<Record<string, never> | null>(
    null,
  )

  const handleCreateUser = useCallback(async (newUser: UserPayload) => {
    setLoading(true)

    try {
      const resp = await usersApi.postUser(newUser)

      setCreatedUser(resp.data)
    } catch (error) {
      console.error('[handleCreateUser]', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    createdUser,
    handleCreateUser,
  }
}
