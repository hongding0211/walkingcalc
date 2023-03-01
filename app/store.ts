import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import userReducer from '../feature/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export default store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
