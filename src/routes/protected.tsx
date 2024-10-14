import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getDataLocalStorage } from '../storage/localStorage'
import { useEffect, useState } from 'react'
import BackgroundUser from '../components/BackgroundUser'
import { useGetAllReducers, useGetReducer } from '../hooks/useGetReducer'

const Protected = () => {
  const location = useLocation()
  const rotaAcessada = location.pathname
  const reduxData = useGetAllReducers()
  const [loading, setLoading] = useState(true)
  const telasPermitidas = useGetReducer('telasPermitidas')
  const rotasPermitidasAllUser = [
    '/fagammon-esports/home',
    '/fagammon-esports/cadastro',
    '/fagammon-esports/perfil',
    '/fagammon-esports/editar-dados',
  ]

  useEffect(() => {
    if (reduxData) {
      setLoading(false)
    }
  }, [reduxData])

  const hasTokenLocalStorage = () => {
    const token = getDataLocalStorage('token')
    return !!token
  }

  const hasTokenRedux = () => {
    return !!reduxData?.token
  }

  const isAuthenticated = () => {
    return hasTokenRedux() || hasTokenLocalStorage()
  }

  //tipar o meny

  const permissaoParaAcessarRota = () => {
    if (rotasPermitidasAllUser.includes(rotaAcessada)) return true
    return !!telasPermitidas.find((menu: any) =>
      rotaAcessada.includes(menu.route)
    )
  }

  if (loading) {
    return null
  }

  return isAuthenticated() && permissaoParaAcessarRota() ? (
    <BackgroundUser isAuthenticated={isAuthenticated()}>
      <div
        style={{
          width: 'calc(100vw - 100px)',
          height: 'calc(100vh - 64px)',
          position: 'absolute',
          top: 64,
          left: 100,
          padding:
            rotaAcessada === '/fagammon-esports/cadastro' ||
            rotaAcessada === '/fagammon-esports/editar-dados'
              ? 0
              : 40,
          zIndex: 1,
        }}
      >
        <Outlet />
      </div>
    </BackgroundUser>
  ) : (
    <Navigate to="/fagammon-esports" />
  )
}

export default Protected
