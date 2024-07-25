import { User } from './users-api'

export interface AuthPayload {
  account_number: string
  pin: string
}

export interface AuthApi {
  authenticateUser: (payload: AuthPayload) => Promise<User>
}
