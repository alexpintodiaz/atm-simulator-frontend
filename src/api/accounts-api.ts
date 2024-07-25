import { fetchApi } from './api-instance'
import { AccountsApi } from './interfaces/accounts-api'
import { Account } from './interfaces/users-api'

export const accountsApi: AccountsApi = {
  deposit: async () => {
    const { data } = await fetchApi<Account>({
      endpoint: '/user',
      method: 'POST',
    })
    return data
  },
}
