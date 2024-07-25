import { FC } from 'react'
import { CardComponent } from '../components/card-component'
import { useUserStore } from '../store/user-store'

export const Dashboard: FC = () => {
  const state = useUserStore()

  const { name, email, accounts } = state

  return (
    <div className='bg-zinc-900 h-screen text-white flex flex-col items-center justify-between'>
      <div className='bg-gray-500 p-4 w-2/5'>
        <h1 className='text-3xl font-bold text-center block my-2'>
          Welcome {name}
        </h1>
        <h2>What can we do for you today?</h2>
        <h3>
          your email is : <i>{email}</i>
        </h3>

        <CardComponent
          title={`Current Balance: ${accounts[0].balance}`}
          text={`My account number is ${accounts[0].account_number}`}
          className='my-6'
        />
      </div>
    </div>
  )
}
