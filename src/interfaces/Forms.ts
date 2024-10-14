export interface IFormEditarDados {
  idUsuario: number
  cpf: string
  email: string
  nickname: string
  nomeUsuario: string
  telefoneUsuario: string
  dataNascimento: string
  sexo: string
  cep: string
  rua: string
  numeroCasa: number
  bairro: string
  cidade: string
  estado: string
}

export interface IFormPerfil {
  cpf: string
  email: string
  nomeUsuario: string
  telefone: string
}
