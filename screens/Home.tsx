import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../components/Button'
import { setToken } from '../feature/user/userSlice'

const Home: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogout = useCallback(() => {
    dispatch(
      setToken({
        token: undefined,
      })
    )
  }, [])

  return (
    <Button
      title="Logout"
      onPress={handleLogout}
    />
  )
}

export default Home
