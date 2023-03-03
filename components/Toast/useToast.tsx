import { useToast as useNBToast } from 'native-base'

import Toast from './index'

const useToast = () => {
  const toast = useNBToast()

  return (title = '') => {
    toast.closeAll()
    toast.show({
      render: () => <Toast title={title} />,
      duration: 3000,
    })
  }
}

export default useToast
