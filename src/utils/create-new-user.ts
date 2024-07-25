import { UserPayload } from '../components/user-form'
import { usersApi } from '../api/users-api'
import { User } from '../api/interfaces/users-api'

export const crateNewUser = async (newUser: UserPayload): Promise<User> => {
  const resp = await usersApi.postUser(newUser)
  console.log('resp', resp)
  return resp
}
