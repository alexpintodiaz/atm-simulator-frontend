import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/user-store'

export const ProtectRoute: FC<PropsWithChildren> = ({ children }) => {
  const state = useUserStore()

  const { id } = state

  if (!id) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}
