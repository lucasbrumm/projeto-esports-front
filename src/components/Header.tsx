import { useNavigate } from 'react-router-dom'
import { defaultColors } from '../utils/colors'
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useGetReducer } from '../hooks/useGetReducer'

const Header = () => {
  const user = useGetReducer('user')
  const navigate = useNavigate()

  const home = () => {
    navigate('/fagammon-esports/home')
  }

  return (
    <div
      style={{
        backgroundColor: defaultColors.darkGreenColor,
        color: 'white',
        width: '100vw',
        height: 60,
        minWidth: 500,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 100,
          }}
        >
          <div id="barra-lateral">
            <HorizontalSplitIcon color="secondary" fontSize="large" />
          </div>
        </div>
        <div
          id="dados-usuario"
          style={{
            display: 'flex',
            width: 400,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <div
            style={{
              width: 200,
              height: 50,
              backgroundColor: defaultColors.lightGrey,
              borderRadius: 20,
            }}
          ></div>
          <NotificationsIcon color="secondary" fontSize="large" />
          <div
            style={{
              backgroundColor: 'red',
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
          ></div>
          <ArrowDropDownIcon color="secondary" fontSize="large" />
        </div>
      </div>
    </div>
  )
}

export default Header
