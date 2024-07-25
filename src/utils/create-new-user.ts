import { UserPayload } from '../components/user-form'
import { usersApi } from '../api/users-api'

export const crateNewUser = async (newUser: UserPayload): Promise<any> => {
  const resp = await usersApi.postUser(newUser)
  console.log('resp', resp)
  return resp
}
