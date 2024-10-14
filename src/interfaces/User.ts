export interface User {
  id: number
  cpf: string
  email: string
  userRole: number
  enabled: boolean
  firstAccess: boolean
}

export interface IUserLoginPassword {
  login: string
  password: string
}

export interface IUserIdAndNewNickname {
  userId?: number
  newNickName: string
}
export interface IDadosUsuario {
  id: number
  cpf: string
  email: string
  nome: string
  userRole: number
  enabled: boolean
  firstAccess: boolean
}

export interface IToken {
  token: string
}
