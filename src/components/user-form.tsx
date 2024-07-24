import {
  Envelope,
  Lock,
  ChalkboardTeacher,
  DeviceMobileSpeaker,
} from 'phosphor-react'
import { Button, InputIcon, Input, Label } from 'keep-react'

export const UserForm = () => {
  return (
    <form className='mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md'>
      <fieldset className='space-y-1'>
        <Label htmlFor='name'>Name</Label>
        <div className='relative'>
          <Input placeholder='Enter name' className='ps-11' />
          <InputIcon>
            <ChalkboardTeacher size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>
      <fieldset className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <div className='relative'>
          <Input placeholder='Enter email' className='ps-11' />
          <InputIcon>
            <Envelope size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>

      <fieldset className='space-y-1'>
        <Label htmlFor='phone'>Phone</Label>
        <div className='relative'>
          <Input placeholder='Enter phone' className='ps-11' />
          <InputIcon>
            <DeviceMobileSpeaker size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>

      <fieldset className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <div className='relative'>
          <Input
            id='password'
            placeholder='Enter password'
            type='password'
            className='ps-11'
          />
          <InputIcon>
            <Lock size={19} color='#AFBACA' />
          </InputIcon>
        </div>
      </fieldset>
      <Button size='sm' color='secondary' type='submit'>
        Sign In
      </Button>
    </form>
  )
}
