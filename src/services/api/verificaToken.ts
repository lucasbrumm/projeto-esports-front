import { getDataLocalStorage } from "../../storage/localStorage"

// Toda rota privada deve chamar essa função para verificar o Token
const get = async (url:string) => {
  try {
    const token = await getDataLocalStorage('token')
    if (!token) {
      redirecionaLogin()
    }
    // fms.defaults.headers.Authorization = `Bearer ${token.replaceAll(`"`, '')}`
    // return await fms.get(url)
  } catch (e: any) {
    if (e.response.status === 401) {
      redirecionaLogin()
    }
    throw new Error(e)
  }
}

function redirecionaLogin() {
  window.location.href = '/login'
}
