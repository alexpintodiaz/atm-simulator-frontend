import { ActionButton } from './components/action-button'
import { useAppNavigate } from './hooks/use-app-navigate'

function App() {
  const navigate = useAppNavigate()

  return (
    <div className='border border-[#6533ee9b] rounded-3xl p-5 w-4/5 sm:w-7/12 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5'>
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
  )
}

export default App
