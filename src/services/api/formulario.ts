import axios from 'axios'
import { BASE_URL } from './common'

const formulario = axios.create({
  baseURL: BASE_URL + '/api/fieldForm',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function findAllFields() {
  try {
    const { data } = await formulario.get('')
    return data
  } catch (error) {
    console.log('Erro ao buscar campos', error)
  }
}

export async function findFieldsByLabel(fields: number[]) {
  try {
    const { data } = await formulario.post('', fields)
    return data
  } catch (error) {
    console.log('Erro ao buscar campos do perfil', error)
  }
}
