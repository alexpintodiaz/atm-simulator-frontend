import { FC } from 'react'
import { LogIn } from '../components/log-in'

export const Auth: FC = () => {
  return (
    <section className='min-h-screen flex flex-col place-items-center place-content-center'>
      <LogIn />
    </section>
  )
}
