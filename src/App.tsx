import { ActionButton } from './components/action-button'
import { useAppNavigate } from './hooks/use-app-navigate'
import { useUserStore } from './store/user-store'

function App() {
  const { getUsers } = useUserStore()
  const navigate = useAppNavigate()

  getUsers()

  return (
    <div className='bg-zinc-900 h-screen text-white flex flex-col items-center justify-between'>
      <div className='bg-gray-500 p-4 w-2/5'>
        <h1 className='text-3xl font-bold text-center block my-2'>
          ATM Simulator
        </h1>
        <div className='flex justify-around'>
          <ActionButton text='Enter' onClick={() => navigate('/auth')} />
          <ActionButton
            text='Create Account'
            onClick={() => navigate('/create')}
          />
        </div>
      </div>
    </div>
  )
}

export default App
