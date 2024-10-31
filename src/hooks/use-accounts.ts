import { useState } from 'react'
import { toast } from 'keep-react'
import { accountsApi } from '../api/accounts-api'
import { useUserStore } from '../store/user-store'
import {
  AccountTransferPayload,
  TransactionType,
} from '../api/interfaces/accounts-api'
import { AxiosError } from 'axios'

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
      if (error instanceof AxiosError) {
        error.response?.status === 400
          ? toast.error('Something went wrong, please try again')
          : toast.error(error.response?.data.message)
      }
      console.error(['accountDeposit', error])
    }
  }

  const accountTransfer = async (
    senderAccount: string,
    payload: AccountTransferPayload,
  ) => {
    setIsLoading(true)

    try {
      const resp = await accountsApi.transfer(senderAccount, payload)

      updateAccountBalance(0, resp.balance)
      toast.success(resp.message)

      setIsLoading(false)

      return resp
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        error.response?.status === 400
          ? toast.error('Something went wrong, please try again')
          : toast.error(error.response?.data.message)
      }
      console.error(['accountTransfer', error])
    }
  }

  return {
    isLoading,
    accountDepositWithdrawals,
    accountTransfer,
  }
}
