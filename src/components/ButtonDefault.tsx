import { Typography } from '@mui/material'
import { stylesButtonDefault } from '../utils/styles'
import { defaultColors } from '../utils/colors'
import { ButtonDefaultProps } from '../interfaces/InterfaceComponents'

function ButtonDefault({
  label,
  action,
  marginTopCustom = 50,
  widthCustom = 200,
}: ButtonDefaultProps) {
  return (
    <div
      style={{
        ...stylesButtonDefault.container,
        ...{ marginTop: marginTopCustom },
      }}
    >
      <div
        style={{
          ...stylesButtonDefault.buttonBack,
          ...{ width: widthCustom + 3 },
        }}
        onClick={action}
      >
        <div
          style={{
            ...stylesButtonDefault.buttonFront,
            ...{ width: widthCustom },
          }}
        >
          <Typography
            style={{
              fontSize: 14,
              color: defaultColors.primaryText,
              marginLeft: 10,
            }}
          >
            {label}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ButtonDefault
