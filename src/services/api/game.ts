import axios from 'axios'
import { BASE_URL } from './common'

const game = axios.create({
  baseURL: BASE_URL + '/api/game',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function findGames() {
  try {
    const { data } = await game.get('/allGames')
    return data
  } catch (error) {
    console.log('Erro ao buscar lista de games', game)
  }
}

export async function findAllRole(): Promise<any> {
  try {
    const { data } = await game.get('/role/allRoles')
    return data
  } catch (error) {
    console.log('Erro ao buscar posições', game)
  }
}
