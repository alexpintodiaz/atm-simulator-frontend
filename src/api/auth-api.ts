import { fetchApi } from './api-instance'
import { AuthApi } from './interfaces/auth-api'
import { User } from './interfaces/users-api'

export const authApi: AuthApi = {
  authenticateUser: async (payload) => {
    const { data } = await fetchApi<User>({
      endpoint: '/auth',
      method: 'POST',
      payload,
    })
    return data
  },
}
