import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import generalSlice from '../feature/general/generalSlice'
import userReducer from '../feature/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    general: generalSlice,
  },
})

type RootState = ReturnType<typeof store.getState>

export default store

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
