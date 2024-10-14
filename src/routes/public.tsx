import { Navigate, Outlet } from 'react-router-dom'
import { getDataLocalStorage } from '../storage/localStorage'

const Public = () => {
  const isAuthenticated = () => {
    const token = getDataLocalStorage('token')
    return !!token
  }
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/fagammon-esports" />
}

export default Public
