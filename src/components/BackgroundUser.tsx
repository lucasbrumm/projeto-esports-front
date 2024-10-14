import atentaImage from '../assets/atenta-logo.png'
import { CSSProperties, ReactNode } from 'react'

function BackgroundUser({
  children,
  isAuthenticated,
}: {
  children: ReactNode
  isAuthenticated: boolean
}) {
  const rotaAcessada = document.location.pathname
  const containerStyle =
    isAuthenticated &&
    (rotaAcessada === '/fagammon-esports/cadastro' ||
      rotaAcessada === '/fagammon-esports/editar-dados')
      ? { ...stylesBackgroundUser.container, backgroundColor: 'black' }
      : stylesBackgroundUser.container

  return (
    <div style={containerStyle as CSSProperties}>
      <div style={stylesBackgroundUser.atentaLogo as CSSProperties}>
        <img
          src={atentaImage}
          alt='Atenta logo'
          style={stylesBackgroundUser.imageSize}
        />
      </div>
      {children}
    </div>
  )
}

const stylesBackgroundUser = {
  container: {
    backgroundColor: '#4a4a4a',
    height: '100vh',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: 'JetBrains Mono',
    fontSize: 'x-large',
  },
  atentaLogo: {
    zIndex: 1,
    position: 'absolute',
    bottom: -150,
    left: -200,
  },
  imageSize: {
    width: 750,
    height: 750,
  },
}

export default BackgroundUser
