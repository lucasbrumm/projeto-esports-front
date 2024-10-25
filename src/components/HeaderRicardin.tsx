import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearReducer } from '../redux/reducer'
import { convertStringUserRole } from '../utils/helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCaretDown,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material'
import { userWithoutImage } from '../utils/userWithoutImage'
import { defaultColors } from '../utils/colors'
import { useGetReducer } from '../hooks/useGetReducer'

const HeaderRicardin = () => {
  const user = useGetReducer('user')
  const imageUser = useGetReducer('imageUser')
  const nicknameUser = useGetReducer('nicknameUser')
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function logout() {
    dispatch(clearReducer())
    setTimeout(() => {
      navigate('/fagammon-esports')
    }, 200)
  }

  // async function handleGetUserImage(userId) {
  //   try {
  //     const imagem = await getImageUser(userId)
  //     setImageUser(imagem)
  //   } catch (error) {
  //     console.error('Erro ao buscar imagem do usuário', error)
  //   }
  // }

  const StyledMenu = styled(Menu)`
    && {
      & .MuiPaper-root {
        width: 200px;
        border: 1px solid black;
      }
    }
  `

  const showNotification = () => {
    alert('notificação')
  }

  const goProfile = () => {
    setAnchorEl(null)
    navigate('/fagammon-esports/perfil')
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar
          style={{
            backgroundColor: '#4d602d',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => alert('a')}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            {/* role e nick do usuário */}
            <div
              style={{
                backgroundColor: defaultColors.lightGrey,
                padding: 5,
                borderRadius: 12,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                {nicknameUser || convertStringUserRole(user?.userRole)} -{' '}
                {convertStringUserRole(user?.userRole)}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div>
                <IconButton
                  size="large"
                  aria-label="show notificication"
                  color="inherit"
                  onClick={showNotification}
                >
                  <FontAwesomeIcon icon={faBell} fontSize={25} />
                </IconButton>
              </div>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ display: 'flex', gap: 10 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      alt="Imagem do usuário"
                      src={imageUser || userWithoutImage}
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = userWithoutImage
                      }}
                      style={{
                        width: 39,
                        height: 39,
                        borderRadius: 20,
                      }}
                    />
                  </div>
                  <FontAwesomeIcon icon={faCaretDown} fontSize={25} />
                </IconButton>
                <StyledMenu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={goProfile}
                    style={{ display: 'flex', gap: 10 }}
                  >
                    <FontAwesomeIcon icon={faUser} fontSize={20} />
                    Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={() => logout()}
                    style={{ display: 'flex', gap: 10 }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} fontSize={20} />
                    Sair
                  </MenuItem>
                </StyledMenu>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderRicardin
