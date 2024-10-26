import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'
import { IconTextFieldProps } from '../interfaces/InterfaceComponents'

export const iconTextFieldTestId = 'icon-text-field-test-id'

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
          <IconButton
            edge={position}
            onClick={actionClick}
            data-testid={iconTextFieldTestId}
          >
            {isPassword &&
              (showPassword ? (
                <Visibility color="primary" />
              ) : (
                <VisibilityOff color="primary" />
              ))}
            {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
          </IconButton>
        </Tooltip>
      </InputAdornment>
    ),
  }
}

export default IconTextField
