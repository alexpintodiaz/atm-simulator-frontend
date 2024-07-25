import { useNavigate } from 'react-router-dom'
import { AllPaths } from '../routes/routes'

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const navigation = (goTo: AllPaths, state?: any) => {
    if (goTo === 'goBack') {
      navigate(-1)
    } else if (state) {
      navigate(goTo, { state })
    } else {
      navigate(goTo)
    }
  }

  return navigation
}
