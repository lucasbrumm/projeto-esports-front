import axios from 'axios'
import { BASE_URL } from './common'
import { IEmailFirstAcess } from '../../interfaces/api/InterfaceApiResponse'

const email = axios.create({
  baseURL: BASE_URL + '/api/email',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function sendPrimeiroAcesso(
  emailPrimeiroAcesso: IEmailFirstAcess
) {
  const { data } = await email.post(
    '/send-email-first-acess',
    emailPrimeiroAcesso
  )
  return data
}
