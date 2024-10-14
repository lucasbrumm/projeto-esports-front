import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearReducer } from '../redux/reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useGetReducer } from '../hooks/useGetReducer'

const SideBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const telasPermitidas = useGetReducer('telasPermitidas')
  const paginaAtual = useGetReducer('paginaAtual')

  // useLayoutEffect(() => {
  //   gsap.fromTo(
  //     '.menu-item-sair',
  //     { x: -50, opacity: 0 },
  //     { x: 0, opacity: 1, duration: 1 }
  //   )
  //   gsap.fromTo(
  //     '.menu-container',
  //     { x: -50, opacity: 0 },
  //     { x: 0, opacity: 1, duration: 1 }
  //   )
  // }, [])

  const sair = () => {
    dispatch(clearReducer())
    setTimeout(() => {
      navigate('/fagammon-esports')
    }, 200)
  }

  return (
    <div className="menu-lateral">
      <div className="menu-container">
        {Array.isArray(telasPermitidas) &&
          telasPermitidas?.map(
            (menu, index) =>
              menu.visible && (
                <div
                  key={index}
                  className="menu-item"
                  onClick={() => {
                    if (menu.externalLink) {
                      window.open(menu.externalLink)
                    } else {
                      navigate(menu.route)
                    }
                  }}
                  style={{ opacity: menu.text === paginaAtual ? 1 : 0.5 }}
                >
                  <div className="texto-item-menu-container">
                    <span
                      className="texto-item-menu"
                      style={{
                        color: 'black',
                        fontSize: 22,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {menu.text}
                    </span>
                  </div>
                </div>
              )
          )}
      </div>
      <div
        className="menu-item menu-item-sair"
        onClick={sair}
        // style={{ backgroundColor: 'blue' }}
      >
        <div className="icone-container">
          <FontAwesomeIcon icon={faRightFromBracket} fontSize={20} />
        </div>
        <div className="texto-item-menu-container">
          <span
            className="texto-item-menu"
            style={{
              color: 'black',
              fontSize: 22,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {'Sair'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SideBar
