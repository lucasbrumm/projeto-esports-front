import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Snackbar, TextField, Typography } from '@mui/material'
import { CheckBoxOutlineBlankRounded } from '@mui/icons-material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useNavigate } from 'react-router-dom'
import './login.css'
import '@fontsource/jetbrains-mono'
import { useDispatch } from 'react-redux'

import ModalDefault from '../../components/ModalDefault'
import { validarCPF, validarEmail } from '../../utils/helper'
import BackgroundDefault from '../../components/BackgroundDefault'
import { TextMaskCPF } from '../../utils/helperComponents'
import { setTelasPermitidas, setToken, setUser } from '../../redux/reducer'
import { account, loginAuth } from '../../services/api/auth'
import { sendPrimeiroAcesso } from '../../services/api/email'
import { setDataLocalStorage } from '../../storage/localStorage'
import { getScreenByRole } from '../../services/api/screen'
import IconTextField from '../../components/IconTextField'
import { defaultColors } from '../../utils/colors'
import ButtonGroupDefault from '../../components/ButtonGroupDefault'
import { ITextFieldGroup } from '../../interfaces/InterfaceComponents'
import { IError } from '../../interfaces/error'
import { IDadosUsuario, IUserLoginPassword } from '../../interfaces/User'
import { IEmailFirstAcess } from '../../interfaces/api/InterfaceApiResponse'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [lembrarSenha, setLembrarSenha] = useState<boolean>(false)
  // //login admin
  const [loginField, setLoginField] = useState<string>('11111111111')
  const [passwordField, setPasswordField] = useState<string>('admin')
  //login player
  // const [loginField, setLoginField] = useState('22222222222')
  // const [passwordField, setPasswordField] = useState('coach')
  // //login coach
  // const [loginField, setLoginField] = useState('33333333333')
  // const [passwordField, setPasswordField] = useState('player')
  const [emailPrimeiroAcesso, setEmailPrimeiroAcesso] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [modalPrimeiroAcesso, setModalPrimeiroAcesso] = useState<boolean>(false)
  const [modalRequisicaoEnviada, setModalRequsicaoEnviada] =
    useState<boolean>(false)
  const [msgTextModal, setMsgTextModal] = useState<string>('')
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false)
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false)
  const [openError, setOpenError] = useState<boolean>(false)
  const [error, setError] = useState<IError>({
    mensagem: 'Erro interno',
    tipo: 'error',
  })

  const buttonGroupDefault = [
    {
      id: 1,
      label: 'Primeiro Acesso',
      action: () => primeiroAcesso(),
      firstButton: true,
    },
    {
      id: 2,
      label: 'Acessar',
      action: () => signIn(),
      firstButton: false,
    },
  ]

  const textFieldGroup: ITextFieldGroup[] = [
    {
      id: 1,
      label: 'Login',
      value: loginField,
      variant: 'standard',
      type: 'text',
      onChange: (e: any) => setLoginField(e.target.value),
      style: { width: '70%', color: 'secondary' },
      focused: true,
      inputProps: {
        style: {
          color: defaultColors.primaryText,
          fontSize: 14,
          paddingVertical: 5,
        },
      },
    },
    {
      id: 2,
      label: 'Senha',
      value: passwordField,
      variant: 'standard',
      type: showPassword ? 'text' : 'password',
      onChange: (e: any) => setPasswordField(e.target.value),
      onKeyDown: (e: any) => {
        if (e.key === 'Enter') {
          signIn()
        }
      },
      InputProps: IconTextField({
        actionClick: handleClickShowPassword,
        isPassword: true,
        showPassword: showPassword,
        position: 'end',
        tooltipString: 'mostrar/esconder senha',
      }),
      style: { width: '70%' },
      focused: true,
      inputProps: {
        style: {
          color: defaultColors.primaryText,
          fontSize: 14,
          paddingVertical: 5,
        },
      },
    },
  ]

  const textFieldGroupPrimeiroAcesso = [
    {
      id: 1,
      label: 'Email',
      value: emailPrimeiroAcesso,
      variant: 'standard',
      type: 'text',
      onChange: (e: any) => setEmailPrimeiroAcesso(e.target.value),
      style: { color: 'secondary' },
      focused: true,
      InputProps: null,
      inputProps: {
        style: {
          color: defaultColors.primaryText,
          fontSize: 14,
          paddingVertical: 5,
        },
      },
    },
    {
      id: 2,
      label: 'CPF',
      value: cpf,
      variant: 'standard',
      type: 'text',
      onChange: (e: any) => setCpf(e.target.value),
      style: { color: 'secondary' },
      focused: true,
      InputProps: {
        inputComponent: TextMaskCPF,
      },
      inputProps: {
        style: {
          color: defaultColors.primaryText,
          fontSize: 14,
          paddingVertical: 5,
        },
      },
    },
  ]

  // useEffect usado para navegar para a próxima página se existir token
  // useEffect(() => {
  //   if (token) {
  //     navigationLogin(user)
  //   }
  // }, [token])

  // useEffect usado para verificar se existe dados salvos no localstorage para preencher os dados de login e senha
  useEffect(() => {
    checkStorage()
  }, [])

  // função para verificar se existe dados salvos no localstorage para preencher os dados de login e senha
  function checkStorage() {
    const storedDataString = localStorage.getItem('data')
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString)
      setLoginField(storedData.login)
      setPasswordField(storedData.password)
    }
  }

  function navigationLogin(dadosUsuario: IDadosUsuario) {
    const firstAccess = dadosUsuario?.firstAccess
    if (firstAccess) {
      setTimeout(() => {
        navigate('/fagammon-esports/cadastro')
      }, 200)
    } else {
      // setTimeout(() => {
      navigate('/fagammon-esports/home')
      // }, 200)
    }
  }

  async function loginByToken(token: string) {
    try {
      const dadosUsuario = await account(token)
      getTelasPermitidas(dadosUsuario.userRole)
      dispatch(setUser(dadosUsuario))
      dispatch(setToken(token))
      navigationLogin(dadosUsuario)
      dataLocalStorage(returnDataFields())
    } catch (e) {
      showError(e)
    }
    setLoadingLogin(false)
  }

  // função para fazer login
  async function signIn() {
    setLoadingLogin(true)
    try {
      const credentials = returnDataFields()
      const data = await loginAuth(credentials)
      if (data) {
        await loginByToken(data)
      }
    } catch (e) {
      showError(e)
    } finally {
      setLoadingLogin(false)
    }
  }

  async function getTelasPermitidas(userRoleId: number) {
    const { data: telasPermitidas } = await getScreenByRole(userRoleId)
    dispatch(setTelasPermitidas(telasPermitidas))
  }

  // retornar os campos de login e senha
  function returnDataFields(): IUserLoginPassword {
    return {
      login: loginField,
      password: passwordField,
    }
  }

  // função para salvar os dados de login e senha no localstorage
  // caso o usuário tenha marcado a opção de lembrar senha
  function dataLocalStorage(credentials: IUserLoginPassword) {
    if (lembrarSenha) {
      setDataLocalStorage('data', JSON.stringify(credentials))
    } else {
      localStorage.removeItem('data')
    }
  }

  // função para deslogar
  // async function logout() {
  //   const tokenObj = { token: localStorage.getItem('token') }
  //   const logout = await logoutAuth(tokenObj)
  //   if (logout) {
  //     alert('Deslogado com sucesso')
  //     localStorage.removeItem('token')
  //     dispatch(clearReducer())
  //   }
  // }

  // função para mostrar ou esconder a senha
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }

  const showError = (e: any) => {
    switch (e?.response?.status) {
      case 400:
      case 401:
        setError({ mensagem: 'Dados Inválidos', tipo: 'warning' })
        setOpenError(true)
        break
      case 403:
        setError({ mensagem: 'Sem autorização', tipo: 'warning' })
        setOpenError(true)
        break
      default:
        setError({ mensagem: 'Erro Interno', tipo: 'error' })
        setOpenError(true)
    }
  }

  function checkBox() {
    return lembrarSenha ? (
      <CheckBoxIcon color="primary" fontSize="small" />
    ) : (
      <CheckBoxOutlineBlankRounded color="primary" fontSize="small" />
    )
  }

  function primeiroAcesso() {
    setEmailPrimeiroAcesso('')
    setCpf('')
    setModalPrimeiroAcesso(true)
  }

  // função para solicitar o primeiro acesso
  async function solicitarPrimeiroAcesso() {
    const trueEmail = validarEmail(emailPrimeiroAcesso)
    const trueCpf = validarCPF(cpf)
    if (trueEmail && trueCpf) {
      const newAcess: IEmailFirstAcess = {
        cpfReceiver: cpf?.replace(/\D/g, ''),
        emailReceiver: emailPrimeiroAcesso,
      }
      try {
        setLoadingEmail(true)
        await sendPrimeiroAcesso(newAcess)
          .then((response) => {
            setMsgTextModal(
              'Bora lá! Uma requisição de primeiro acesso foi encaminhada para seu e-mail.'
            )
          })
          .catch((error) => {
            setMsgTextModal(
              'Já existe uma solicitação de primeiro acesso para esse email, por favor recupere a senha!'
            )
          })

        setModalPrimeiroAcesso(false)
        setModalRequsicaoEnviada(true)
      } catch (error) {
        console.log('Erro ao fazer solicitar o primeiro acesso', error)
      } finally {
        setLoadingEmail(false)
        setModalPrimeiroAcesso(false)
      }
    }
  }

  function closeModalRequisicaoEnviada() {
    setModalRequsicaoEnviada(false)
    setMsgTextModal('')
  }

  return (
    <Fragment>
      <BackgroundDefault>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openError}
          autoHideDuration={5000}
          onClose={() => setOpenError(false)}
        >
          <Alert
            onClose={() => setOpenError(false)}
            severity={error.tipo}
            sx={{ width: '100%' }}
          >
            {error.mensagem}
          </Alert>
        </Snackbar>
        <div className="tela-login">
          <div
            className="border-box"
            style={{ backgroundColor: defaultColors.ligthGreenColor }}
          >
            <div
              className="box-inputs"
              style={{ backgroundColor: defaultColors.greyColor }}
            >
              <div className="inputs-login-password">
                {textFieldGroup?.map((input) => (
                  <TextField
                    key={input.id}
                    label={input.label}
                    style={input.style}
                    value={input.value}
                    onChange={input.onChange}
                    type={input.type}
                    onKeyDown={input.onKeyDown}
                    InputProps={input.InputProps}
                    focused={input.focused}
                    inputProps={input.inputProps}
                    variant={input.variant}
                  />
                ))}
                <div className="container-check-box">
                  <div
                    className="container-lembrar-senha"
                    onClick={() => setLembrarSenha(!lembrarSenha)}
                  >
                    {checkBox()}
                    <Typography
                      color="primary"
                      style={{ fontSize: 12, cursor: 'pointer', marginLeft: 5 }}
                    >
                      Lembrar senha
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      color="primary"
                      onClick={() => alert('cliquyesdasd')}
                      style={{ fontSize: 12, cursor: 'pointer' }}
                    >
                      Esqueceu sua senha?
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="container-text-fagammon">
                <div>
                  <Typography
                    color="primary"
                    style={{
                      fontSize: 50,
                      fontFamily: 'Bungee',
                      fontWeight: 'bold',
                    }}
                    className="text-gammon-esports"
                    lineHeight={1}
                  >
                    GAMMON+ ESPORTS
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {/* Botão primeiro acesso e acessar */}
          <ButtonGroupDefault
            arrayButton={buttonGroupDefault}
            loading={loadingLogin}
            buttonLoad={1}
          />
        </div>
      </BackgroundDefault>

      {/* Modal primeiro acesso */}
      <ModalDefault
        openModal={modalPrimeiroAcesso}
        setOpenModal={setModalPrimeiroAcesso}
        hasInput={true}
        inputData={textFieldGroupPrimeiroAcesso}
        hasButton={true}
        buttonText={'OK'}
        action={solicitarPrimeiroAcesso}
        hasLoading={true}
        loading={loadingEmail}
        titleModal={'Primeiro Acesso'}
        modalText="Informe seu e-mail e CPF para solicitar o primeiro acesso."
      />

      {/* Modal requisição enviada */}
      <ModalDefault
        openModal={modalRequisicaoEnviada}
        setOpenModal={setModalRequsicaoEnviada}
        titleModal={''}
        modalText={msgTextModal}
        hasButton={true}
        buttonText={'Ok'}
        action={closeModalRequisicaoEnviada}
        hasLoading={false}
      />
    </Fragment>
  )
}

export default Login
