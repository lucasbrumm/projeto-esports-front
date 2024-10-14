import axios from 'axios'

const externalApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getCEP({ cep }: { cep: string }) {
  try {
    const { data } = await externalApi.get(
      `https://viacep.com.br/ws/${cep}/json/`
    )
    return data
  } catch (error) {
    console.error('Erro ao buscar CEP', error)
  }
}
