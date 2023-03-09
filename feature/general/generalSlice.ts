import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type GeneralState = {
  loading: boolean
  scan: {
    data: any
    success: boolean
  }
}

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loading: false,
    scan: {
      data: undefined,
      success: false,
    },
  } as GeneralState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ status: boolean }>) => {
      state.loading = action.payload.status
    },
    setScanCodeResult: (state, action: PayloadAction<{ data: any }>) => {
      state.scan.data = action.payload.data
    },
    setScanSuccess: (state, action: PayloadAction<{ success: boolean }>) => {
      state.scan.success = action.payload.success
    },
  },
})

export const { setLoading, setScanCodeResult, setScanSuccess } = generalSlice.actions

export default generalSlice.reducer
