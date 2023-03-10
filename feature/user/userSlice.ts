import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
  isLogin: boolean
  isLoginComplete: boolean
  token?: string
  data?: {
    uuid?: string
    name?: string
    avatar?: string
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    token: undefined,
  } as UserState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token?: string }>) => {
      state.token = action.payload.token
      if (action.payload?.token) {
        AsyncStorage.setItem('token', action.payload.token).catch()
      } else {
        state.isLogin = false
        state.data = undefined
        AsyncStorage.removeItem('token').catch()
      }
    },
    setUserData: (
      state,
      action: PayloadAction<{
        data?: { uuid: string; name: string; avatar: string }
      }>
    ) => {
      state.data = action.payload.data
    },
    setIsLogin: (state, action: PayloadAction<{ isLogin: boolean }>) => {
      state.isLogin = action.payload.isLogin
    },
    setIsLoginComplete: (state, action: PayloadAction<{ isLoginComplete: boolean }>) => {
      state.isLoginComplete = action.payload.isLoginComplete
    },
  },
})

export const { setToken, setUserData, setIsLogin, setIsLoginComplete } = userSlice.actions
export default userSlice.reducer
