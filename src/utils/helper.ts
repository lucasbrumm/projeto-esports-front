export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '') // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false // Verifica se o CPF tem 11 dígitos e se todos os dígitos são iguais
  }

  // Calcula o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto

  // Verifica o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
    return false
  }

  // Calcula o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto

  // Verifica o segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
    return false
  }

  return true
}

export function convertStringGame(game: number): string {
  switch (game) {
    case 1:
      return 'CS:2'
    case 2:
      return 'League of Legends'
    case 3:
      return 'Valorant'
    default:
      return ''
  }
}

export function convertStringUserRole(userRole: number): string {
  switch (userRole) {
    case 1:
      return 'Admin'
    case 2:
      return 'Coach'
    case 3:
      return 'Player'
    default:
      return ''
  }
}

export function validaCEP(cep: string): boolean {
  const regex = /^[0-9]{5}-[0-9]{3}$/
  return regex.test(cep)
}

export function convertData(stringData: string): string {
  const date = stringData
  const newDate = new Date(date)

  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`

  return formattedDate
}
