import { Fragment, useEffect, useMemo, useState } from 'react'
import { Location } from 'react-router-dom'
import HeaderRicardin from './HeaderRicardin'
import SideBar from './SideBar'

interface SidebarAndHeaderProps {
  location: Location<any>
}

export const SidebarAndHeader = ({
  location,
}: SidebarAndHeaderProps): JSX.Element => {
  const [esconderMenu, setEsconderMenu] = useState(true)
  const locationPathname = location.pathname

  const rotasPrivadas = useMemo(() => ['/home', '/perfil'], [])

  useEffect(() => {
    if (rotasPrivadas.some((rota) => locationPathname.includes(rota))) {
      setEsconderMenu(false)
    } else {
      setEsconderMenu(true)
    }
  }, [locationPathname, rotasPrivadas])

  return (
    <Fragment>
      {!esconderMenu && (
        <div>
          <HeaderRicardin />
          <SideBar />
        </div>
      )}
    </Fragment>
  )
}
