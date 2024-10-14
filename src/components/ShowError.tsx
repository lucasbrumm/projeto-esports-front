interface ShowErrorProps {
  e: any
  setError: any
  setOpenError: any
}

export const showError = ({ e, setError, setOpenError }: ShowErrorProps) => {
  switch (e?.response?.status) {
    case 400:
    case 401:
      setError({ mensagem: 'Dados Inválidos', tipo: 'warning' })
      setOpenError(true)
      break
    case 403:
      setError({ mensagem: 'Preencha todos os campos', tipo: 'warning' })
      setOpenError(true)
      break
    case 409:
      setError({
        mensagem: 'Já existe esse nickname cadastrado',
        tipo: 'warning',
      })
      setOpenError(true)
      break
    default:
      setError({ mensagem: 'Erro Interno', tipo: 'error' })
      setOpenError(true)
  }
}
