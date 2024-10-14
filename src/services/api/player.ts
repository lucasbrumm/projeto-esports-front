import axios from 'axios'
import { BASE_URL } from './common'
import { IPlayer } from '../../interfaces/api/InterfaceApiResponse'

const player = axios.create({
  baseURL: BASE_URL + '/api/player',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const savePlayer = (dataPlayer: IPlayer) => {
  return player.post('/save', dataPlayer)
}
