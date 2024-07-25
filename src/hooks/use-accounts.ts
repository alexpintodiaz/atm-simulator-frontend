import { useState } from 'react'
import { accountsApi } from '../api/accounts-api'
import { useUserStore } from '../store/user-store'

export const useAccounts = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { updateBalance } = useUserStore()

  const accountDeposit = async (accountNumber: string, amount: number) => {
    setIsLoading(true)

    try {
      const resp = await accountsApi.deposit(accountNumber, amount)

      updateBalance(resp.balance)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(['accountDeposit', error])
    }
  }

  return {
    isLoading,
    accountDeposit,
  }
}
