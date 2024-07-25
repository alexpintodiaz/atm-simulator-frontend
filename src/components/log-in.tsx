import { Lock, Bank } from 'phosphor-react'
import { Button, InputIcon, Input, Label, Spinner } from 'keep-react'
import { useState } from 'react'
import { useUsers } from '../hooks/use-users'
import { useAppNavigate } from '../hooks/use-app-navigate'
import { AuthPayload } from '../api/interfaces/auth-api'

export const LogIn = () => {
  const navigate = useAppNavigate()

  const [auth, setAuth] = useState<AuthPayload>({
    account_number: '',
    pin: '',
  })

  const { isLoading, authenticateUser } = useUsers()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setAuth({ ...auth, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    authenticateUser(auth)
  }

  return (
    <>
      <form
        className='mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md'
        onSubmit={handleSubmit}>
        <fieldset className='space-y-1'>
          <Label htmlFor='account_number'>Account Number</Label>
          <div className='relative'>
            <Input
              name='account_number'
              placeholder='Enter account'
              className='ps-11'
              onChange={handleChange}
            />
            <InputIcon>
              <Bank size={19} color='#AFBACA' />
            </InputIcon>
          </div>
        </fieldset>

        <fieldset className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              id='pin'
              name='pin'
              placeholder='Enter password'
              type='password'
              className='ps-11'
              onChange={handleChange}
            />
            <InputIcon>
              <Lock size={19} color='#AFBACA' />
            </InputIcon>
          </div>
        </fieldset>
        <Button size='sm' color='secondary'>
          {isLoading ? <Spinner color='info' size='md' /> : 'Log In'}
        </Button>
      </form>
      <Button onClick={() => navigate('goBack')} size='sm' color='secondary'>
        Go Back
      </Button>
    </>
  )
}
