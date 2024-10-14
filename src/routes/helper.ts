import { redirect } from 'react-router-dom'
import { getDataLocalStorage } from '../storage/localStorage'

export const isAuthenticated = async () => {
  const token = getDataLocalStorage('token')
  const firstAccess = getDataLocalStorage('firstAcess')

  if (firstAccess) throw redirect('/fagammon-esports/cadastro')

  if (token) throw redirect('/fagammon-esports/home')

  return null
}

export const isFistAcess = async () => {
  const firstAccess = getDataLocalStorage('firstAcess')

  if (!firstAccess) throw redirect('/fagammon-esports/home')

  return null
}
