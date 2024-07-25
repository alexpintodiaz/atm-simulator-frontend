import { ActionButton } from './components/action-button'
import { UserForm } from './components/user-form'
import { useUserStore } from './store/user-store'
import { Footer } from './ui/footer'
import { Header } from './ui/header'

function App() {
  const { getUsers } = useUserStore()

  getUsers()

  return (
    <div className='bg-zinc-900 h-screen text-white flex flex-col items-center justify-between'>
      <Header />
      <div className='bg-gray-500 p-4 w-2/5'>
        <h1 className='text-3xl font-bold text-center block my-2'>
          ATM Simulator DEVV
        </h1>
        <div className='flex justify-around'>
          <ActionButton text='Enter' />
          <ActionButton text='Create Account' />
        </div>

        <UserForm />
      </div>
      <Footer />
    </div>
  )
}

export default App
