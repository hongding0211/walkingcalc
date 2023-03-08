import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GeneralState = {
  loading: boolean
}

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loading: false,
  } as GeneralState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ status: boolean }>) => {
      state.loading = action.payload.status
    },
  },
})

export const { setLoading } = generalSlice.actions

export default generalSlice.reducer
