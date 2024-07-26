import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='bg-zinc-800'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
