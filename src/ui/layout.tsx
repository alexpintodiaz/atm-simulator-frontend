import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='pt-16 min-h-screen bg-zinc-700 text-white flex flex-col place-items-center place-content-start'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
