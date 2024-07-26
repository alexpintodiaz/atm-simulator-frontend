import { CardComponent } from '../components/card-component'
import { FC, useCallback } from 'react'
import { useAppNavigate } from '../hooks/use-app-navigate'
import { useUserStore } from '../store/user-store'
import { ActionButton } from '../components/action-button'
import { AccountModalAction } from '../components/account-modal-action'
import { formatMoney } from '../utils/format-money'
import { TransferModal } from '../components/transfer-modal'
import { useModal } from '../hooks/use-modal'

export const Dashboard: FC = () => {
  const navigate = useAppNavigate()
  const state = useUserStore()

  const {
    isOpen: isOpenDepositModal,
    handleOpen: handleOpenDepositModal,
    handleClose: handleCloseDepositModal,
  } = useModal()
  const {
    isOpen: isOpenTransferModal,
    handleOpen: handleOpenTransferModal,
    handleClose: handleCloseTransferModal,
  } = useModal()

  const { name, email, accounts } = state

  const exitAccount = useCallback(() => {
    state.clearStore()
    navigate('/')
  }, [navigate, state])

  const formattedBalance = formatMoney(accounts[0].balance)

  return (
    <section className='bg-gray-500 p-4 w-2/5'>
      <h2 className='text-3xl font-bold text-center block my-2'>
        Welcome {name}
      </h2>
      <h2>What can we do for you today?</h2>
      <h5>
        Your email is : <i>{email}</i>
      </h5>

      <CardComponent
        title={`Current Balance: ${formattedBalance}`}
        text={`My account number is ${accounts[0].account_number}`}
        className='my-6'
      />

      <div className='flex justify-around'>
        <ActionButton
          text='Deposit / Withdrawals'
          onClick={handleOpenDepositModal}
        />
        <ActionButton text='Transfer' onClick={handleOpenTransferModal} />
        <ActionButton text='Log Out' onClick={exitAccount} />
        <AccountModalAction
          isModalOpen={isOpenDepositModal}
          handleCloseModal={handleCloseDepositModal}
        />
        <TransferModal
          isModalOpen={isOpenTransferModal}
          handleCloseModal={handleCloseTransferModal}
        />
      </div>
    </section>
  )
}
