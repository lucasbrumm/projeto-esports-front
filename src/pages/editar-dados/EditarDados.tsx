import { Fragment, useCallback, useEffect, useState } from 'react'
import { defaultColors } from '../../utils/colors'
import { Button, Typography } from '@mui/material'
import TextForm from '../../components/TextForm'
import { useGetReducer } from '../../hooks/useGetReducer'
import { findFieldsByLabel } from '../../services/api/formulario'
import { fieldsCadastro } from '../../services/fields'
import {
  getInformacoesUsuario,
  saveInformacoesUsuario,
} from '../../services/api/user'
import { convertData } from '../../utils/helper'
import './editar-dados.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNicknameUser } from '../../redux/reducer'
import SnackBarErrorDefault from '../../components/SnackBarErrorDefault'
import { IFormEditarDados } from '../../interfaces/Forms'
import { IError } from '../../interfaces/error'

function EditarDados() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useGetReducer('user')
  const [fieldEditDados, setFieldsEditDados] = useState([])
  const [form, setForm] = useState<IFormEditarDados>({
    idUsuario: 0,
    cpf: '',
    email: '',
    nickname: '',
    nomeUsuario: '',
    telefoneUsuario: '',
    dataNascimento: '',
    sexo: '',
    cep: '',
    rua: '',
    numeroCasa: 0,
    bairro: '',
    cidade: '',
    estado: '',
  })

  const [openError, setOpenError] = useState(false)
  const [error, setError] = useState<IError>({
    mensagem: 'Erro interno',
    tipo: 'error',
  })

  const setFormData = useCallback(
    (result: { value: { data: IFormEditarDados } }) => {
      const dataFormatada = convertData(result?.value.data.dataNascimento)
      setForm((currentForm) => ({
        ...currentForm,
        idUsuario: user?.id,
        cpf: user?.cpf,
        email: user?.email,
        nickname: result?.value.data.nickname,
        nomeUsuario: result?.value.data.nomeUsuario,
        telefone: result?.value.data.telefoneUsuario,
        dataNasc: dataFormatada,
        sexo: result?.value.data.sexo,
        cep: result?.value.data.cep,
        rua: result?.value.data.rua,
        numeroCasa: result?.value.data.numeroCasa,
        bairro: result?.value.data.bairro,
        cidade: result?.value.data.cidade,
        estado: result?.value.data.estado,
      }))
    },
    [user]
  )

  const verifyDataPromisses = useCallback(
    (result: any, index: number) => {
      if (index === 0) {
        setFieldsEditDados(result?.value)
      } else {
        setFormData(result)
      }
    },
    [setFormData]
  )

  const buscarDados = useCallback(async () => {
    const promisses = [
      findFieldsByLabel(fieldsCadastro),
      getInformacoesUsuario(user.id),
    ]
    Promise.allSettled(promisses)
      .then((results) => {
        results.forEach((result, index) => {
          verifyDataPromisses(result, index)
        })
      })
      .catch((error) => console.log(error))
    if (user) {
      setForm((currentForm) => ({
        ...currentForm,
        cpf: user?.cpf,
        email: user?.email,
      }))
    }
  }, [user, verifyDataPromisses])

  const goPerfil = () => {
    setTimeout(() => {
      navigate('/fagammon-esports/perfil')
    }, 200)
  }

  const saveUserInformation = async () => {
    if (!validateFields) {
      setError({ mensagem: 'Preencha todos os campos', tipo: 'warning' })
      setOpenError(true)
      return
    }
    try {
      const saveUser = await saveInformacoesUsuario(form)
      if (saveUser?.status === 200) {
        const newNickname = form.nickname
        dispatch(setNicknameUser(newNickname))
        setTimeout(() => {
          navigate('/fagammon-esports/perfil')
        }, 200)
      }
    } catch (error) {
      showError(error)
    }
  }

  const validateFields = () => {
    return (
      form?.nickname &&
      form?.nomeUsuario &&
      form?.telefoneUsuario &&
      form?.dataNascimento &&
      form?.sexo &&
      form?.cep &&
      form?.rua &&
      form?.numeroCasa &&
      form?.bairro &&
      form?.cidade &&
      form?.estado
    )
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

  useEffect(() => {
    buscarDados()
  }, [buscarDados])

  return (
    <Fragment>
      <SnackBarErrorDefault
        openError={openError}
        setOpenError={setOpenError}
        setError={setError}
        error={{ mensagem: error.mensagem, tipo: 'success' }}
      />
      <div className="container-editar-dados">
        <div
          className="card-maior-editar-dados"
          style={{
            backgroundColor: defaultColors.darkGreenColor,
          }}
        >
          <Typography
            style={{ fontSize: 26, color: defaultColors.primaryText }}
          >
            Editar Dados
          </Typography>
          <div
            className="card-menor-editar-dados"
            style={{
              backgroundColor: defaultColors.greyColor,
            }}
          >
            <div className="container-text-form">
              <TextForm
                data={fieldEditDados}
                responseForm={form}
                setResponseForm={setForm}
                widthField={'50%'}
                colorText={defaultColors.primaryText}
                colorInput={'primary'}
                colorTextInput={defaultColors.primaryText}
                heightField={75}
              />
            </div>
            <div className="container-button-salvar">
              <Button
                style={{ color: 'white', width: 140, marginRight: 10 }}
                variant="contained"
                color="secondary"
                onClick={goPerfil}
              >
                CANCELAR
              </Button>
              <Button
                style={{ color: 'white', width: 140 }}
                variant="contained"
                color="secondary"
                onClick={saveUserInformation}
              >
                SALVAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditarDados
