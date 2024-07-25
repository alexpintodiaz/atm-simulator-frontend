import { fetchApi } from './api-instance'
import { UsersApi } from './interfaces/users-api'

export const usersApi: UsersApi = {
  getAllUsers: async () => {
    const { data } = await fetchApi({
      endpoint: '/user',
      method: 'GET',
    })
    return data
  },

  postUser: async (payload) => {
    const { data } = await fetchApi({
      endpoint: '/user',
      method: 'POST',
      payload,
    })
    return data
  },
}
