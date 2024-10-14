import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { stylesCadastro } from '../../utils/styles'
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from '@mui/material'
import TextForm from '../../components/TextForm'
import RadioGroupDefault from '../../components/RadioGroupDefault'
import { convertStringGame } from '../../utils/helper'
import { findGames, findAllRole } from '../../services/api/game'
import { findFieldsByLabel } from '../../services/api/formulario'
import { useDispatch } from 'react-redux'
import { getUserByLogin, saveInformacoesUsuario } from '../../services/api/user'
import { setUser } from '../../redux/reducer'
import { useNavigate } from 'react-router-dom'
import { defaultColors } from '../../utils/colors'
import { fieldsCadastro } from '../../services/fields'
import './cadastro.css'
import { useGetReducer } from '../../hooks/useGetReducer'
import { RoleGame } from '../../interfaces/RoleGame'
import { IUserInformation } from '../../interfaces/api/InterfaceApiResponse'

function Cadastro() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useGetReducer('user')
  const [gameList, setGameList] = useState([])
  const [rolesList, setRolesList] = useState<RoleGame[]>([])
  const [fieldsList, setFieldsList] = useState([])
  const [jogoId, setJogoId] = useState<number>(0)
  const [roleGame, setRoleGame] = useState<number>(0)
  const [form, setForm] = useState({
    cpf: '',
    email: '',
    nickname: 'brum',
    nomeUsuario: 'Brum',
    telefone: '35992711544',
    dataNasc: '2022-12-12',
    sexo: 'masculino',
    cep: '37204213',
    rua: '',
    numeroCasa: 0,
    bairro: '',
    cidade: '',
    estado: '',
  })

  const [openError, setOpenError] = useState<boolean>(false)
  const [error, setError] = useState({
    mensagem: 'Erro interno',
    tipo: 'error',
  })

  const buscarDados = useCallback(() => {
    const promisses = [
      findGames(),
      findFieldsByLabel(fieldsCadastro),
      findAllRole(),
    ]
    Promise.allSettled(promisses)
      .then((results) => {
        results.forEach((result, index) => {
          verifyDataPromisses(result, index)
        })
      })
      .catch((error) => console.log(error))
    if (user) {
      setForm({
        ...form,
        cpf: user?.cpf,
        email: user?.email,
      })
    }
  }, [user])

  function verifyDataPromisses(result: any, index: number) {
    if (index === 0) {
      setGameList(result?.value)
    } else if (index === 1) {
      setFieldsList(result?.value)
    } else if (index === 2) {
      setRolesList(result?.value)
    } else {
      console.log('Promessa rejeitada com motivo: ', result?.reason)
    }
  }

  function findRoleGames() {
    const role = rolesList?.filter((role) => role?.idGame === jogoId)
    return role
  }

  const saveInformationUser = async () => {
    if (!validateFields()) {
      setError({ mensagem: 'Preencha todos os campos', tipo: 'warning' })
      setOpenError(true)
      return
    }
    try {
      const response = await saveInformacoesUsuario(formatUserPlayer())
      if (response?.status === 200) {
        const newUser = await getUserByLogin(user.cpf)
        if (newUser) dispatch(setUser(newUser))
        setTimeout(() => {
          navigate('/fagammon-esports/home')
        }, 200)
      }
    } catch (e) {
      showError(e)
    }
  }

  const showError = (e: any) => {
    switch (e?.response?.status) {
      case 400:
      case 401:
        setError({ mensagem: 'Dados Inválidos', tipo: 'warning' })
        setOpenError(true)
        break
      case 403:
        setError({ mensagem: 'Preencha todos os campos', tipo: 'warning' })
        setOpenError(true)
        break
      case 409:
        setError({
          mensagem: 'Já existe esse nickname cadastrado',
          tipo: 'warning',
        })
        setOpenError(true)
        break
      default:
        setError({ mensagem: 'Erro Interno', tipo: 'error' })
        setOpenError(true)
    }
  }

  const formatUserPlayer = () => {
    const userInformation: IUserInformation = {
      idUsuario: user?.id,
      nickname: form.nickname,
      nomeUsuario: form.nomeUsuario,
      telefone: form.telefone,
      dataNasc: form.dataNasc,
      sexo: form.sexo,
      cep: form.cep,
      rua: form.rua,
      numeroCasa: form.numeroCasa,
      bairro: form.bairro,
      cidade: form.cidade,
      estado: form.estado,
      player: {
        idPlayer: user?.id,
        idRole: roleGame,
        idGame: jogoId,
      },
    }
    return userInformation
  }

  const validateFields = () => {
    return (
      form?.nickname &&
      form?.nomeUsuario &&
      form?.telefone &&
      form?.dataNasc &&
      form?.sexo &&
      form?.cep &&
      form?.rua &&
      form?.numeroCasa &&
      form?.bairro &&
      form?.cidade &&
      form?.estado &&
      jogoId &&
      roleGame
    )
  }

  useEffect(() => {
    buscarDados()
  }, [buscarDados])

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openError}
        autoHideDuration={5000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity={'error'}
          sx={{ width: '100%' }}
        >
          {error.mensagem}
        </Alert>
      </Snackbar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 100px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="container-tela-cadastro-back"
          style={{ backgroundColor: defaultColors.darkGreenColor }}
        >
          <Typography
            style={{ fontSize: 26, color: defaultColors.primaryText }}
          >
            Finalize seu cadastro
          </Typography>
          <div
            className="card-cadastro"
            style={{ backgroundColor: defaultColors.greyColor }}
          >
            <div className="container-card">
              <div className="container-form">
                <div className="form-cadastro">
                  <TextForm
                    data={fieldsList}
                    responseForm={form}
                    setResponseForm={setForm}
                    widthField={'50%'}
                    colorText={defaultColors.primaryText}
                    colorInput={'primary'}
                    colorTextInput={defaultColors.primaryText}
                    maxHeightField={53}
                  />
                </div>
              </div>
            </div>
            <div className="container-card">
              <div className="half-card-games-functions">
                <div className="titles-games-functions">
                  <div style={{ width: '50%' }}>
                    <Typography
                      style={{ color: defaultColors.primaryText, fontSize: 22 }}
                    >
                      Games
                    </Typography>
                  </div>

                  <div style={{ width: '50%' }}>
                    <Typography
                      style={{ color: defaultColors.primaryText, fontSize: 22 }}
                    >
                      Função in game
                    </Typography>
                  </div>
                </div>

                <div className="container-games-function">
                  <div className="container-space-game-function">
                    <RadioGroupDefault
                      formLabel={'Selecione o jogo que você compete:'}
                      styleTitle={{
                        marginBlock: 15,
                        color: defaultColors.primaryText,
                        fontSize: 18,
                      }}
                      styleText={{
                        fontSize: 18,
                        color: defaultColors.primaryText,
                        marginLeft: 10,
                      }}
                      data={gameList}
                      setValue={setJogoId}
                    />
                  </div>
                  <div className="container-space-game-function">
                    {jogoId && (
                      <div
                        className="card-functions"
                        style={{
                          backgroundColor: defaultColors.darkGreenColor,
                        }}
                      >
                        <div>
                          <FormControl>
                            <FormLabel
                              id="demo-radio-buttons-group-label"
                              style={{
                                marginBlock: 15,
                                color: defaultColors.primaryText,
                                fontSize: 18,
                              }}
                            >
                              {convertStringGame(jogoId)}
                            </FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              {findRoleGames()?.map((role) => (
                                <FormControlLabel
                                  key={role.idRole}
                                  style={stylesCadastro.textRadio}
                                  value={role.roleValue}
                                  control={<Radio />}
                                  label={role.roleName}
                                  onClick={() => setRoleGame(role.idRole)}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-button">
          <Button
            style={{
              backgroundColor: defaultColors.greyColor,
              color: 'white',
              marginTop: 20,
              width: '100%',
            }}
            variant="contained"
            onClick={saveInformationUser}
          >
            Salvar
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default Cadastro
