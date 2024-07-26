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
    <section className='border border-[#6533ee9b] rounded-3xl p-5 w-10/12 sm:w-9/12 md:w-8/12 lg:w-1/2 xl:w-5/12 2xl:w-4/12'>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-bold text-center block my-2'>
          Welcome {name}
        </h2>
        <h3>What can we do for you today?</h3>
        <h4>
          Your email is : <i>{email}</i>
        </h4>
        <CardComponent
          title={`Current Balance: ${formattedBalance}`}
          text={`My account number is ${accounts[0].account_number}`}
          className='my-6 bg-slate-100'
        />
      </div>
      <div className='flex flex-col gap-4 justify-around sm:flex-row sm:gap-3'>
        <ActionButton
          text='Deposit / Withdrawals'
          onClick={handleOpenDepositModal}
          className='sm:max-w-28 sm:leading-4'
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
