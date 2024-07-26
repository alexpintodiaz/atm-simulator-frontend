import { fetchApi } from './api-instance'
import { AccountsApi } from './interfaces/accounts-api'
import { Account } from './interfaces/users-api'

export const accountsApi: AccountsApi = {
  depositWithdraws: async (accountNumber, transactionType, amount) => {
    const { data } = await fetchApi<Account>({
      endpoint: `/account/${transactionType}/${accountNumber}/`,
      method: 'POST',
      payload: { amount },
    })
    return data
  },
}
