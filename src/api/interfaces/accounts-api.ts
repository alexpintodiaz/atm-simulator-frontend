import { Account } from './users-api'

export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface AccountsApi {
  depositWithdrawals: (
    accountNumber: string,
    transactionType: TransactionType,
    amount: number,
  ) => Promise<Account>

  transfer: (
    accountNumber: string,
    accountTransferPayload: AccountTransferPayload,
  ) => Promise<TransferResponse>
}

export interface AccountTransferPayload {
  account_number: string
  amount: number
}

export interface TransferResponse {
  message: string
  balance: number
}
