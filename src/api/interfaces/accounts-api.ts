import { Account } from './users-api'

export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface AccountsApi {
  depositWithdrawals: (
    accountNumber: string,
    transactionType: TransactionType,
    amount: number,
  ) => Promise<Account>
}
