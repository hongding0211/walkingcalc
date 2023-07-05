import { useDispatch } from 'react-redux'

import { setToast } from '../../feature/general/generalSlice'

const useToast = () => {
  const dispatch = useDispatch()

  return (title = '') => {
    dispatch(
      setToast({
        msg: title,
      })
    )
  }
}

export default useToast
