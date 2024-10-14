import axios from 'axios'
import { BASE_URL } from './common'
import {
  IDadosUsuario,
  IToken,
  IUserLoginPassword,
} from '../../interfaces/User'

const auth = axios.create({
  baseURL: BASE_URL + '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function loginAuth(
  dataLogin: IUserLoginPassword
): Promise<string | undefined> {
  const response = await auth.post('/login', dataLogin)
  return response.data
}

export async function logoutAuth(token: string): Promise<boolean> {
  try {
    const response = await auth.post('/logout', token)
    if (response.status === 200) {
      return true
    } else {
      console.log('Erro ao fazer logout')
      return false
    }
  } catch (error) {
    console.log('Erro ao fazer logout', error)
    return false
  }
}

export async function validateToken(token: string) {
  try {
    const response = await auth.post('/validateToken', token)
    if (response.status === 200) {
      return response.data
    } else {
      return false
    }
  } catch (error) {
    console.log('Erro ao validar token', error)
  }
}

export const account = async (token: string): Promise<IDadosUsuario> => {
  const response = await auth.post('/account', { token: token })
  return response.data
}
