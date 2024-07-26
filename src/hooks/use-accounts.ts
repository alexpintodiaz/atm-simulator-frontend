import { useState } from 'react'
import { toast } from 'keep-react'
import { accountsApi } from '../api/accounts-api'
import { useUserStore } from '../store/user-store'
import { TransactionType } from '../api/interfaces/accounts-api'

export const useAccounts = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { updateAccountBalance } = useUserStore()

  const accountDeposit = async (
    accountNumber: string,
    transaction: TransactionType,
    amount: number,
  ) => {
    setIsLoading(true)

    try {
      const resp = await accountsApi.depositWithdraws(
        accountNumber,
        transaction,
        amount,
      )

      console.log('API', resp)

      updateAccountBalance(0, resp.balance)

      setIsLoading(false)
      toast.success(`$${amount} was successfully deposited`)
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
