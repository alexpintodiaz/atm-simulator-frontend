import { Account } from './users-api'

export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface AccountsApi {
  depositWithdraws: (
    accountNumber: string,
    transactionType: TransactionType,
    amount: number,
  ) => Promise<Account>
}
