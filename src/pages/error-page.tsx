import { FC } from 'react'

export const ErrorPage: FC = () => {
  return (
    <section className='min-h-screen flex flex-col place-items-center place-content-center'>
      <h1 className='font-bold text-8xl text-rose-600 mb-5'>404 Error</h1>

      <p className='font-light text-3xl leading-6 text-[#79828D] mb-20'>
        The page you are looking for does not exist
      </p>
    </section>
  )
}
