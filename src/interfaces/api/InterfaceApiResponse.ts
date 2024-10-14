export interface IApiResponse {
  status: number
  data: any
}
export interface IIdUser {
  idUser: number
}

export interface INicknameUserAndImage {
  nickname: string
  imageBase64: string
}

export interface IUserInformation {
  idUsuario: number
  nickname: string
  nomeUsuario: string
  telefone: string
  dataNasc: string
  sexo: string
  cep: string
  rua: string
  numeroCasa: number
  bairro: string
  cidade: string
  estado: string
  player?: IPlayer
}

export interface IPlayer {
  idPlayer: number
  idGame: number
  idRole: number
}

export interface IEmailFirstAcess {
  cpfReceiver: string
  emailReceiver: string
}

export interface ISaveImage {
  userId: number
  base64: string
}
