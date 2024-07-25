import {
  Envelope,
  Lock,
  ChalkboardTeacher,
  DeviceMobileSpeaker,
} from 'phosphor-react'
import { Button, InputIcon, Input, Label, Spinner } from 'keep-react'
import { useState } from 'react'
import { crateNewUser } from '../utils/create-new-user'
import { useUsers } from '../hooks/use-users'

export interface UserPayload {
  name: string
  email: string
  phone?: number
  pin: string
}

export const UserForm = () => {
  const [newUser, setNewUser] = useState<UserPayload>({
    name: '',
    email: '',
    phone: 0,
    pin: '',
  })

  const { isLoading, createNewUser } = useUsers()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const newValue = name === 'phone' ? parseInt(value, 10) : value

    setNewUser({ ...newUser, [name]: newValue })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(newUser)
    // const res = await crateNewUser(newUser)
    createNewUser(newUser)

    // console.log(res)
  }

  return (
    <form
      className='mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md'
      onSubmit={handleSubmit}>
      <fieldset className='space-y-1'>
        <Label htmlFor='name'>Name</Label>
        <div className='relative'>
          <Input
            name='name'
            placeholder='Enter name'
            className='ps-11'
            onChange={handleChange}
          />
          <InputIcon>
            <ChalkboardTeacher size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>
      <fieldset className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <div className='relative'>
          <Input
            name='email'
            placeholder='Enter email'
            className='ps-11'
            onChange={handleChange}
          />
          <InputIcon>
            <Envelope size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>

      <fieldset className='space-y-1'>
        <Label htmlFor='phone'>Phone</Label>
        <div className='relative'>
          <Input
            name='phone'
            placeholder='Enter phone'
            className='ps-11'
            onChange={handleChange}
          />
          <InputIcon>
            <DeviceMobileSpeaker size={19} color='#AFBACA' />
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
        {isLoading ? <Spinner color='info' size='md' /> : 'Create Account'}
      </Button>
    </form>
  )
}
