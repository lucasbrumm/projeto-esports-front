import { Typography, CircularProgress } from '@mui/material'
import { stylesButtonDefault } from '../utils/styles'
import { defaultColors } from '../utils/colors'

interface ButtonGroupDefaultProps {
  arrayButton: any[]
  marginTopCustom?: number
  loading: boolean
  buttonLoad?: number
}

function ButtonGroupDefault({
  arrayButton,
  marginTopCustom = 50,
  loading,
  buttonLoad,
}: ButtonGroupDefaultProps) {
  return (
    <div
      style={{
        ...stylesButtonDefault.container,
        ...{ marginTop: marginTopCustom },
      }}
    >
      {arrayButton &&
        arrayButton?.map((button, index) => {
          return (
            <div
              key={button.id}
              style={
                !button.firstButton
                  ? stylesButtonGroupDefault.buttonBackGray
                  : undefined
              }
              onClick={loading ? null : button.action}
            >
              <div key={button.id} style={stylesButtonDefault.buttonBack}>
                <div style={stylesButtonDefault.buttonFront}>
                  {loading && index === buttonLoad ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <CircularProgress size={20} />
                    </div>
                  ) : (
                    <Typography
                      style={{
                        fontSize: 14,
                        color: defaultColors.primaryText,
                        marginLeft: 10,
                      }}
                    >
                      {button.label}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

const stylesButtonGroupDefault = {
  buttonBackGray: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 203,
    backgroundColor: defaultColors.greyColor,
    height: 30,
    cursor: 'pointer',
  },
}

export default ButtonGroupDefault
