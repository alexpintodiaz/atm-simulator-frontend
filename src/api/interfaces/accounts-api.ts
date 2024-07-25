import { Account } from './users-api'

export interface AccountsApi {
  deposit: (accountNumber: string, amount: number) => Promise<Account>
}
