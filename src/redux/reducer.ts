import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../interfaces/User'

interface InitialStateType {
  user: User | {}
  token: string
  telasPermitidas: string[]
  toastMessage: string
  toastType: string
  imageUser: string
  nicknameUser: string
  paginaAtual: string
}

const initialState: InitialStateType = {
  user: {},
  token: '',
  telasPermitidas: [''],
  toastMessage: '',
  toastType: '',
  imageUser: '123',
  nicknameUser: '',
  paginaAtual: '',
}

export const reducer = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setTelasPermitidas: (state, action: PayloadAction<string[]>) => {
      state.telasPermitidas = action.payload
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload
    },
    setToastType: (state, action: PayloadAction<string>) => {
      state.toastType = action.payload
    },
    setImageUser: (state, action: PayloadAction<string>) => {
      state.imageUser = action.payload
    },
    setNicknameUser: (state, action: PayloadAction<string>) => {
      state.nicknameUser = action.payload
    },
    setPaginaAtual: (state, action: PayloadAction<string>) => {
      state.paginaAtual = action.payload
    },
    clearReducer: (state) => {
      state.user = {}
      state.token = ''
      state.telasPermitidas = ['']
      state.toastMessage = ''
      state.imageUser = ''
      state.nicknameUser = ''
      state.paginaAtual = ''
    },
  },
})

export const {
  setUser,
  setToken,
  setTelasPermitidas,
  setToastMessage,
  setToastType,
  setImageUser,
  setNicknameUser,
  clearReducer,
} = reducer.actions

export default reducer.reducer
