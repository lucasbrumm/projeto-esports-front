import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import './perfil.css'
import { userWithoutImage } from '../../utils/userWithoutImage'
import {
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Modal,
  Box,
  Button,
} from '@mui/material'
import { useGetReducer } from '../../hooks/useGetReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import {
  converImageBase64File,
  saveImageBase64,
  saveNewNickname,
} from '../../services/api/user'
import { useDispatch } from 'react-redux'
import { setImageUser, setNicknameUser } from '../../redux/reducer'
import IconTextField from '../../components/IconTextField'
import { findFieldsByLabel } from '../../services/api/formulario'
import TextForm from '../../components/TextForm'
import { fieldsPerfil } from '../../services/fields'
import { useNavigate } from 'react-router-dom'
import { IFormPerfil } from '../../interfaces/Forms'
import { IUserIdAndNewNickname } from '../../interfaces/User'
import { ISaveImage } from '../../interfaces/api/InterfaceApiResponse'

function Perfil() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useGetReducer('user')
  const nicknameUser = useGetReducer('nicknameUser')
  const imageUser = useGetReducer('imageUser')
  const [editingNickName, setEditingNickName] = useState<boolean>(false)
  const [nicknameField, setNicknameField] = useState<string>('')
  const [noImage, setNoImage] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [, setSelectedFile] = useState<File>()
  const [imageFileModal, setImageFileModal] = useState('')
  const [changedImage, setChangedImage] = useState<boolean>(false)
  const [fieldsProfile, setFieldsProfile] = useState([])
  const [form, setForm] = useState<IFormPerfil>({
    cpf: '',
    email: '',
    nomeUsuario: 'Brum',
    telefone: '35992711544',
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const buscarDados = useCallback(async () => {
    const fields = await findFieldsByLabel(fieldsPerfil)
    setFieldsProfile(fields)
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        cpf: user?.cpf,
        email: user?.email,
      }))
    }
  }, [user])

  const saveNickName = async () => {
    if (nicknameField !== '') {
      const data: IUserIdAndNewNickname = {
        userId: user.id,
        newNickName: nicknameField,
      }
      try {
        const newNickName = await saveNewNickname(data)
        if (newNickName) {
          if (newNickName.status === 200) {
            dispatch(setNicknameUser(data.newNickName))
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setEditingNickName(false)
        setNicknameField('')
      }
    } else {
      setEditingNickName(false)
      setNicknameField('')
    }
  }

  const editNickName = () => {
    setEditingNickName(true)
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const eventFile: File = event.target.files[0]
      setSelectedFile(eventFile)
      loadingImageModal(eventFile)
      setChangedImage(!!eventFile)
      if (!!eventFile) setNoImage(false)
    }
  }

  const onUpload = async () => {
    const data: ISaveImage = {
      userId: user.id,
      base64: imageFileModal,
    }
    await saveImageBase64(data)
    dispatch(setImageUser(imageFileModal))
    closeModalImage()
  }

  const loadingImageModal = async (file: File) => {
    const formData = newFormData(file)
    const image = await converImageBase64File(formData)
    setImageFileModal(image)
  }

  const newFormData = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return formData
  }

  const openImageModal = () => {
    setModalImage(true)
    if (imageUser) {
      setImageFileModal(imageUser)
    } else {
      setNoImage(true)
    }
  }

  const closeModalImage = () => {
    setModalImage(false)
    setChangedImage(false)
  }

  const goEditarDados = () => {
    setTimeout(() => {
      navigate('/fagammon-esports/editar-dados')
    }, 200)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

  useEffect(() => {
    if (editingNickName) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [editingNickName])

  useEffect(() => {
    buscarDados()
  }, [buscarDados])

  return (
    <Fragment>
      <div className="container-perfil">
        <div className="container-half-perfil-image">
          <div className="container-imagem">
            <img
              alt=""
              className="image-profile"
              src={imageUser ?? userWithoutImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = userWithoutImage
              }}
            />
            <div className="edit-image-icon">
              <IconButton>
                <Tooltip title="Editar imagem">
                  <FontAwesomeIcon
                    icon={faEdit}
                    cursor="pointer"
                    onClick={openImageModal}
                  />
                </Tooltip>
              </IconButton>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {editingNickName ? (
              <Fragment>
                <TextField
                  inputRef={inputRef}
                  onChange={(e) => setNicknameField(e.target.value)}
                  style={{ color: 'secondary', marginTop: 8 }}
                  focused
                  variant="standard"
                  InputProps={IconTextField({
                    icon: faSave,
                    actionClick: saveNickName,
                    tooltipString: 'Salvar novo nickname',
                    position: 'end',
                  })}
                  placeholder="Digite o novo nickname"
                />
              </Fragment>
            ) : (
              <Fragment>
                <Tooltip title="editar nickname">
                  <IconButton onClick={editNickName}>
                    <FontAwesomeIcon icon={faEdit} cursor="pointer" />
                  </IconButton>
                </Tooltip>
                <Typography variant="h6">{nicknameUser}</Typography>
              </Fragment>
            )}
          </div>
        </div>
        <div className="container-half-perfil-data">
          <div className="title-data">
            <Typography variant="h2" component="h2">
              DADOS PESSOAIS
            </Typography>
          </div>
          <div className="card-data">
            <div style={{ paddingLeft: 20 }}>
              <TextForm
                data={fieldsProfile}
                responseForm={form}
                setResponseForm={setForm}
                widthField={'80%'}
                colorText={'black'}
                colorInput={'secondary'}
                colorTextInput={'black'}
              />
            </div>
            <div className="container-button-ver-mais">
              <Button
                style={{ color: 'white', width: 140 }}
                variant="contained"
                color="secondary"
                onClick={goEditarDados}
              >
                VER MAIS
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={modalImage}
        onClose={closeModalImage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecionar imagem
          </Typography>
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 150,
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {noImage ? (
              <div>
                <Typography color="primary" fontSize={20}>
                  Sem imagem
                </Typography>
              </div>
            ) : (
              <img
                src={imageFileModal}
                style={{ width: 300, height: 300 }}
                alt=""
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              gap: 5,
              alignItems: 'center',
            }}
          >
            <TextField
              type="file"
              id="modal-modal-description"
              onChange={onFileChange}
              inputProps={{
                accept: 'image/*',
              }}
            />
            <Button
              variant="contained"
              style={{ height: 56 }}
              onClick={onUpload}
              disabled={!changedImage}
            >
              Enviar
            </Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  )
}

export default Perfil
