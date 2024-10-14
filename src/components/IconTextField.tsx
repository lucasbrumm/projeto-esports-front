import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'
import { IconTextFieldProps } from '../interfaces/InterfaceComponents'

function IconTextField({
  icon,
  actionClick,
  tooltipString,
  position = 'start',
  isPassword,
  showPassword,
  ...props
}: IconTextFieldProps) {
  return {
    endAdornment: (
      <InputAdornment position={position}>
        <Tooltip title={tooltipString}>
          <IconButton edge={position} onClick={actionClick}>
            {isPassword &&
              (showPassword ? (
                <Visibility color='primary' />
              ) : (
                <VisibilityOff color='primary' />
              ))}
            {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
          </IconButton>
        </Tooltip>
      </InputAdornment>
    ),
  }
}

export default IconTextField
