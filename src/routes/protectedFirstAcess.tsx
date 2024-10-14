import { Navigate, Outlet } from 'react-router-dom'
import { getDataLocalStorage } from '../storage/localStorage'
import { useEffect, useState } from 'react'
import { useGetAllReducers } from '../hooks/useGetReducer'

const ProtectedFirstAcess = () => {
  const firstAccess = getDataLocalStorage('firstAcess')
  const reduxData = useGetAllReducers()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (reduxData) {
      setLoading(false)
    }
  }, [reduxData])

  if (loading) {
    return null
  }

  const hasFirstAcess = () => {
    return !!reduxData?.user.firstAccess
  }

  return firstAccess || hasFirstAcess() ? (
    <Navigate to="/fagammon-esports/cadastro" />
  ) : (
    <Outlet />
  )
}

export default ProtectedFirstAcess
