import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  email: '',
  username: '',
  displayName: '',
  avatar: '',
  role: '',
  accessToken: '',
  refreshToken: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      const { payload } = action
      state._id = payload._id
      state.email = payload.email
      state.username = payload.username
      state.displayName = payload.displayName
      state.avatar = payload.avatar
      state.role = payload.role
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    logout: (state) => {
      state._id = ''
      state.email = ''
      state.username = ''
      state.displayName = ''
      state.avatar = ''
      state.role = ''
      state.accessToken = ''
      state.refreshToken = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { signin, logout } = authSlice.actions

export default authSlice.reducer