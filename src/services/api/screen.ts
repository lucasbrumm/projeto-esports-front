import axios from 'axios'
import { BASE_URL } from './common'

const screen = axios.create({
  baseURL: BASE_URL + '/api/screen',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getScreenByRole = (roleId: number) => {
  return screen.get('/role/' + roleId)
}
