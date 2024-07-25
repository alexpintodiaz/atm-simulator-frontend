export interface User {
  id: string
  email: string
  name: string
  phone: number
  accounts: Account[]
}

export interface Account {
  id: string
  account_number: string
  pin: string
  balance: number
  userId: string
}

export interface UsersApi {
  getAllUsers: () => Promise<any>

  postUser: (payload: any) => Promise<User>
}
