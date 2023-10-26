import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthStateI, AuthStatusEnum, UserI } from './auth.interface';


const initialState:AuthStateI = {
    status: AuthStatusEnum.checking,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserI>) => {
      state.status = AuthStatusEnum.authenticated
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null
    },
    logout: (state, {payload}: PayloadAction<{errorMessage?: string | null }>) => {
      state.status = AuthStatusEnum.notAuthenticated
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = AuthStatusEnum.checking
    },
  }
});

export const {login, logout, checkingCredentials} = authSlice.actions

export default authSlice.reducer