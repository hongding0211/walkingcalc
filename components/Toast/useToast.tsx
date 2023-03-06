import { useToast as useNBToast } from 'native-base'
import { useRef } from 'react'

import Toast from './index'

const useToast = () => {
  const toast = useNBToast()

  const show = useRef(false)

  return (title = '') => {
    if (show.current) {
      return
    }
    toast.show({
      render: () => <Toast title={title} />,
    })
    show.current = true
    setTimeout(() => {
      toast.closeAll()
      show.current = false
    }, 2000)
  }
}

export default useToast
