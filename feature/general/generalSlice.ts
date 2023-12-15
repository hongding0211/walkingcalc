import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GeneralState = {
  loading: boolean
  toast: string
  scan: {
    data: any
    success: boolean
  }
}

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loading: false,
    toast: '',
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
    setToast: (state, action: PayloadAction<{ msg: string }>) => {
      state.toast = action.payload.msg
    },
  },
})

export const { setLoading, setScanCodeResult, setScanSuccess, setToast } =
  generalSlice.actions

export default generalSlice.reducer
