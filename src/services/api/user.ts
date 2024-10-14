import axios from 'axios'
import { BASE_URL } from './common'
import { IUserIdAndNewNickname, User } from '../../interfaces/User'
import {
  IApiResponse,
  IIdUser,
  INicknameUserAndImage,
  ISaveImage,
  IUserInformation,
} from '../../interfaces/api/InterfaceApiResponse'
import { IFormEditarDados } from '../../interfaces/Forms'

const user = axios.create({
  baseURL: BASE_URL + '/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getUserByLogin(login: string): Promise<User | undefined> {
  try {
    const { data } = await user.get('/findByLogin/' + login)
    return data
  } catch (error) {
    console.log('Erro ao buscar usuario por login', error)
  }
}

export async function getImageUser(
  idUser: number
): Promise<string | undefined> {
  try {
    const { data } = await user.get('/image/' + idUser)
    return data
  } catch (error) {
    console.log('Erro ao buscar imagem do usuario', error)
  }
}

export async function getNicknameUser(
  userId: number
): Promise<string | undefined> {
  try {
    const { data } = await user.get(`/informacoes-usuario/nickname/${userId}`)
    return data
  } catch (error) {
    console.log('Erro ao buscar o nickname do usuario', error)
  }
}

export const getnicknameAndImage = async (
  userId: number
): Promise<INicknameUserAndImage | undefined> => {
  try {
    const { data } = await user.get(
      `/informacoes-usuario/nickname-and-image/${userId}`
    )
    return data
  } catch (error) {
    console.log('Erro ao buscar informacoesUsuario', error)
  }
}

export const saveInformacoesUsuario = async (
  dataUser: IFormEditarDados | IUserInformation
): Promise<IApiResponse | undefined> => {
  try {
    const response = await user.post('/informacoes-usuario/save', dataUser)
    return response
  } catch (error) {
    console.log('Erro ao salvar informacoesUsuario', error)
  }
}

export const getInformacoesUsuario = (userId: number) => {
  try {
    const response = user.get(`/informacoes-usuario/${userId}`)
    return response
  } catch (error) {
    console.log('Erro ao buscar informacoesUsuario', error)
  }
}

export const saveNewNickname = async (newNickName: IUserIdAndNewNickname) => {
  try {
    const response: IApiResponse = await user.post(
      '/informacoes-usuario/saveNickname',
      newNickName
    )
    return response
  } catch (error) {
    console.log('Erro ao salvar novo nickname', error)
  }
}

export const uploadImageAndSave = async (file: File, userId: IIdUser) => {
  try {
    const { data } = await user.post('/image/saveImage/' + userId, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const converImageBase64File = async (file: FormData) => {
  try {
    const { data } = await user.post('/image/convertImageBase64', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const saveImageBase64 = async (data: ISaveImage) => {
  try {
    return await user.post('/image/save', data)
  } catch (error) {
    console.error('Error:', error)
  }
}
