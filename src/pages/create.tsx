import { FC } from 'react'
import { UserForm } from '../components/user-form'

export const Create: FC = () => {
  return (
    <section className='min-h-screen flex flex-col place-items-center place-content-center'>
      <UserForm />
    </section>
  )
}
