import { CardComponent } from '../components/card-component'
import { FC, useCallback, useState } from 'react'
import { useAppNavigate } from '../hooks/use-app-navigate'
import { useUserStore } from '../store/user-store'
import { ActionButton } from '../components/action-button'
import { AccountModalAction } from '../components/account-modal-action'

export const Dashboard: FC = () => {
  const navigate = useAppNavigate()
  const state = useUserStore()

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const { name, email, accounts } = state

  const exitAccount = useCallback(() => {
    state.clearStore()
    navigate('/')
  }, [navigate, state])

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
        title={`Current Balance: ${accounts[0].balance}`}
        text={`My account number is ${accounts[0].account_number}`}
        className='my-6'
      />

      <div className='flex justify-around'>
        <ActionButton text='Deposit / Withdrawals' onClick={handleOpenModal} />
        <ActionButton text='Log Out' onClick={exitAccount} />
        <AccountModalAction
          isModalOpen={isOpen}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </section>
  )
}
