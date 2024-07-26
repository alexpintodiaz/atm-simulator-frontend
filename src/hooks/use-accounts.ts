import { useState } from 'react'
import { toast } from 'keep-react'
import { accountsApi } from '../api/accounts-api'
import { useUserStore } from '../store/user-store'
import { TransactionType } from '../api/interfaces/accounts-api'

export const useAccounts = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { updateAccountBalance } = useUserStore()

  const accountDepositWithdrawals = async (
    accountNumber: string,
    transaction: TransactionType,
    amount: number,
  ) => {
    setIsLoading(true)

    try {
      const resp = await accountsApi.depositWithdrawals(
        accountNumber,
        transaction,
        amount,
      )

      updateAccountBalance(0, resp.balance)

      setIsLoading(false)

      transaction === 'deposit'
        ? toast.success(`$${amount} were successfully deposited`)
        : toast.info(`$${amount} were withdrawn successfully`)
    } catch (error) {
      setIsLoading(false)
      console.error(['accountDeposit', error])
    }
  }

  return {
    isLoading,
    accountDepositWithdrawals,
  }
}
