import '@fontsource/jetbrains-mono'
import '@fontsource/bungee'
import { defaultColors } from './colors'
import { CSSProperties } from 'react'

export const stylesLogin = {
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
  imageSize: {
    width: 750,
    height: 750,
  },
  atentaLogo: {
    zIndex: 1,
    position: 'absolute',
    bottom: -150,
    left: -320,
  },
  telaLogin: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  borderBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: defaultColors.ligthGreenColor,
    width: 803,
    height: 300,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  boxInputs: {
    display: 'flex',
    backgroundColor: defaultColors.greyColor,
    width: 800,
    height: 300,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    height: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  containerTextFagammon: {
    display: 'flex',
    width: '40%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: '1',
  },
  containerCheckBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textGammonEsports: {
    fontSize: 50,
    fontFamily: 'Bungee',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
  textLembrarSenha: {
    fontSize: 12,
    cursor: 'pointer',
    marginLeft: 5,
  },
  textEsqueceuSenha: {
    fontSize: 12,
    cursor: 'pointer',
  },
  containerLembrarSenha: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
}

export const stylesButtonDefault = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 80,
  },
  buttonBack: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 203,
    backgroundColor: defaultColors.ligthGreenColor,
    height: 30,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    cursor: 'pointer',
  },
  buttonFront: {
    width: 200,
    backgroundColor: defaultColors.greyColor,
    height: 30,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBackGray: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 203,
    backgroundColor: defaultColors.greyColor,
    height: 30,
    cursor: 'pointer',
  },
}

export const stylesModalDefault = {
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #FFF',
    boxShadow: 24,
    p: 6,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}

export const stylesCadastro = {
  telaCadastroBack: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '85vh',
    width: '50vw',
    backgroundColor: defaultColors.darkGreenColor,
    borderRadius: 10,
    textAlign: 'center',
  },
  telaCadastro: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    width: '50vw',
    textAlign: 'start',
    backgroundColor: defaultColors.greyColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textBackTitle: {
    fontSize: 26,
    color: defaultColors.primaryText,
  },
  containerCard: {
    display: 'flex',
    height: '50%',
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginInline: 20,
    marginBlock: 10,
  },
  formCadastro: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  containerHalf: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  titlesHalf: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '10%',
  },
  titlesHalfWidth: {
    width: '50%',
  },
  titlesHalfText: {
    color: defaultColors.primaryText,
    fontSize: 22,
  },
  containerGamesFunction: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%',
  },
  containerSpaceGameFunction: {
    height: '100%',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFunctions: {
    backgroundColor: defaultColors.darkGreenColor,
    width: 250,
    height: 270,
    marginTop: 20,
    borderRadius: 10,
  },
  textForm: {
    marginBlock: 15,
    color: defaultColors.primaryText,
    fontSize: 18,
  },
  textRadio: {
    fontSize: 18,
    color: defaultColors.primaryText,
    marginLeft: 10,
  },
  containerButton: {
    zIndex: 3,
    display: 'flex',
    width: '50vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSave: {
    backgroundColor: defaultColors.greyColor,
    color: 'white',
    marginTop: 20,
    width: '100%',
  },
}

export const stylesAgendamento: { [key: string]: CSSProperties } = {
  telaAgendamento: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    height: '86vh',
    width: '80vw',
    paddingRight: 150,
    paddingLeft: 50,
    textAlign: 'start',
    position: 'absolute',
    backgroundColor: 'rgba(74, 74, 74, 0.7)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 10,
    left: 0,
    right: 10,
    bottom: 10,
    margin: 'auto',
  },
  titulo: {
    color: defaultColors.primaryText,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 60,
    fontSize: 50,
  },
}

export const stylesTelaInicial: { [key: string]: CSSProperties } = {
  telaInicial: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
  },
  titulo: {
    color: defaultColors.primaryText,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 60,
    fontSize: 50,
  },
}

export const stylesTextForm: { [key: string]: CSSProperties } = {
  fieldsForm: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  textForm: {
    marginBlock: 15,
    color: defaultColors.primaryText,
    fontSize: 18,
  },
  styleTextFields: {
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    justifyContent: 'center',
  },
  moreField: {
    display: 'flex',
    alignItems: 'center',
  },
  moreFieldTextField: {
    marginLeft: 10,
    marginRight: 10,
  },
}

export const inputProps = {
  style: {
    color: defaultColors.primaryText,
    fontSize: 14,
    paddingVertical: 5,
  },
}

export const backgroundUser = {
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
  imageSize: {
    width: 750,
    height: 750,
  },
  atentaLogo: {
    zIndex: 1,
    position: 'absolute',
    bottom: -150,
    left: -200,
  },
}
