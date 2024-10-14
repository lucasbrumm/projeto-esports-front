import atentaImage from '../assets/atenta-logo.png'
import { ReactNode, CSSProperties } from 'react'

function BackgroundDefault({ children }: { children: ReactNode }) {
  return (
    <div style={stylesLogin.container as CSSProperties}>
      <div style={stylesLogin.atentaLogo as CSSProperties}>
        <img
          src={atentaImage}
          alt='Atenta logo'
          style={stylesLogin.imageSize}
        />
      </div>
      {children}
    </div>
  )
}

const stylesLogin = {
  container: {
    backgroundColor: 'black',
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
    left: -320,
  },
  imageSize: {
    width: 750,
    height: 750,
  },
}

export default BackgroundDefault
