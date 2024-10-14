const getToken = () => {
  const dataStringfy = localStorage.getItem('persist:root')
  const data = JSON.parse(dataStringfy as string)
  const token = data?.token?.replace(/"/g, '')
  return token
}

export const getDataLocalStorage = (name: string) => {
  if (name === 'token') return getToken()
  if (name === 'firstAcess') return getFistAcess()
  if (name === 'user') return getUser()
  return localStorage.getItem(name)
}

const getFistAcess = () => {
  const dataStringfy = localStorage.getItem('persist:root')
  const data = JSON.parse(dataStringfy as string)
  const dataUser = data?.user ? JSON.parse(data.user) : null
  const firstAccess = dataUser?.firstAccess
  return firstAccess
}

const getUser = () => {
  const dataStringfy = localStorage.getItem('persist:root')
  const data = JSON.parse(dataStringfy as string)
  const dataUser = data?.user ? JSON.parse(data.user) : null
  return dataUser
}

export const setDataLocalStorage = (name: string, newValue: string) => {
  return localStorage.setItem(name, newValue)
}
