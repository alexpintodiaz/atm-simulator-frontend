import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export const Layout = () => {
  return (
    <>
      <Header />
      <main className='h-[75vh] sm:min-h-[80vh] xl:min-h-[85vh] pt-4 text-white flex flex-col place-items-center place-content-start'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
