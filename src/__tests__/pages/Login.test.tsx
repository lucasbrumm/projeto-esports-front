import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { IDadosUsuario } from '../../interfaces/User'
import { store } from '../../redux/store'
import Login, {
  checkboxLembrarSenhaTestId,
  inputsLoginScreenDataTestId,
} from '../../pages/login/Login'

import { atentaLogoTestId } from '../../components/BackgroundDefault'
import { iconTextFieldTestId } from '../../components/IconTextField'
import { sendPrimeiroAcesso } from '../../services/api/email'
import { validarCPF, validarEmail } from '../../utils/helper'
import { account, loginAuth } from '../../services/api/auth'
import { getScreenByRole } from '../../services/api/screen'

const dadosUserMock: IDadosUsuario = {
  id: 1,
  cpf: '12345678900',
  email: 'lucas@lucas.com',
  nome: 'Lucas',
  userRole: 1,
  enabled: true,
  firstAccess: false,
}

const telasPermitidasMock = ['1', '2']

jest.mock('axios')

jest.mock('../../services/api/auth', () => ({
  account: jest.fn().mockResolvedValue(dadosUserMock),
  loginAuth: jest.fn().mockResolvedValue('mockToken'),
}))

jest.mock('../../services/api/email', () => ({
  sendPrimeiroAcesso: jest.fn().mockResolvedValue({}),
}))

jest.mock('../../storage/localStorage', () => ({
  setDataLocalStorage: jest.fn(),
}))

jest.mock('../../services/api/screen', () => ({
  getScreenByRole: jest.fn().mockResolvedValue({ data: [] }),
}))

jest.mock('../../utils/helper', () => ({
  validarEmail: jest.fn(),
  validarCPF: jest.fn(),
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Snackbar: jest.fn((props) => <div {...props} />),
  Alert: jest.fn((props) => <div {...props} />),
}))

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  )
}

const renderComponentWithModalPrimeiroAcesso = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  )

  const primeiroAcessoButton = screen.getByText('Primeiro Acesso')
  fireEvent.click(primeiroAcessoButton)
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Login Screen - Renderizar componente corretamente', () => {
  test('Login - Atenta Logo', () => {
    renderComponent()
    const atentaLogo = screen.getByTestId(atentaLogoTestId)
    expect(atentaLogo).toBeInTheDocument()
  })

  test('Login - Escrita Gammon+ Esports', () => {
    renderComponent()
    expect(screen.getByText('GAMMON+ ESPORTS')).toBeInTheDocument()
  })

  test('Login - Renderiza campos de login e senha', () => {
    renderComponent()
    // Labels
    expect(screen.getByLabelText('Login')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    // 2 Inputs , login e senha
    Array.from({ length: 2 }).forEach((_, index) => {
      const input = screen.getByTestId(
        inputsLoginScreenDataTestId + `-${index}`
      )
      expect(input).toBeInTheDocument()
    })
  })

  test('Login - Mostra/esconde senha', async () => {
    renderComponent()
    const passwordField = screen.getByLabelText('Senha')
    const toggleButton = screen.getByTestId(iconTextFieldTestId)
    expect(passwordField).toHaveAttribute('type', 'password')
    fireEvent.click(toggleButton)
    expect(passwordField).toHaveAttribute('type', 'text')
    fireEvent.click(toggleButton)
    expect(passwordField).toHaveAttribute('type', 'password')
    fireEvent.mouseEnter(toggleButton)
    await waitFor(() => {
      expect(screen.getByText('mostrar/esconder senha')).toBeInTheDocument()
    })
  })

  test('Login - Lembrar senha checkbox', () => {
    renderComponent()
    const checkbox = screen.getByTestId(checkboxLembrarSenhaTestId)
    expect(checkbox).toBeInTheDocument()
    //checkbox descheckado
    const checkboxIcon = screen.getByTestId('CheckBoxOutlineBlankRoundedIcon')
    expect(checkboxIcon).toBeInTheDocument()
    fireEvent.click(checkbox)
    //checkbox checkado
    const checkboxCheckedIcon = screen.getByTestId('CheckBoxIcon')
    expect(checkboxCheckedIcon).toBeInTheDocument()
  })
})

describe('Login Screen - Modal Primeiro acesso', () => {
  test('Login - Primeiro Acesso modal', () => {
    renderComponent()
    const primeiroAcessoButton = screen.getByText('Primeiro Acesso')
    fireEvent.click(primeiroAcessoButton)

    expect(
      screen.getByText(
        'Informe seu e-mail e CPF para solicitar o primeiro acesso.'
      )
    ).toBeInTheDocument()

    const emailField = screen.getByLabelText('Email')
    const cpfField = screen.getByLabelText('CPF')
    const okButton = screen.getByText('OK')

    expect(emailField).toBeInTheDocument()
    expect(cpfField).toBeInTheDocument()
    expect(okButton).toBeInTheDocument()
  })

  test('Login - Teste de inputs - Inputs inválidos', async () => {
    ;(sendPrimeiroAcesso as jest.Mock).mockResolvedValue({
      result: 'ok',
    })
    ;(validarEmail as jest.Mock).mockReturnValue(false)
    ;(validarCPF as jest.Mock).mockReturnValue(false)

    renderComponentWithModalPrimeiroAcesso()

    const emailField = screen.getByLabelText('Email')
    const cpfField = screen.getByLabelText('CPF')

    const emailValue = 'teste@teste.com'
    const cpfValue = '123.456.789-00'

    fireEvent.change(emailField, { target: { value: emailValue } })
    fireEvent.change(cpfField, { target: { value: cpfValue } })

    expect(emailField).toHaveValue(emailValue)
    expect(cpfField).toHaveValue(cpfValue)

    const okButton = screen.getByText('OK')
    fireEvent.click(okButton)

    await waitFor(() => {
      expect(sendPrimeiroAcesso).not.toHaveBeenCalled()
    })
  })

  test('Login - Teste de inputs - API - Inputs válidos (Resolved)', async () => {
    ;(sendPrimeiroAcesso as jest.Mock).mockResolvedValue({
      result: 'ok',
    })
    ;(validarEmail as jest.Mock).mockReturnValue(true)
    ;(validarCPF as jest.Mock).mockReturnValue(true)

    renderComponentWithModalPrimeiroAcesso()

    const emailField = screen.getByLabelText('Email')
    const cpfField = screen.getByLabelText('CPF')

    const emailValue = 'teste@teste.com'
    const cpfValue = '123.456.789-00'

    fireEvent.change(emailField, { target: { value: emailValue } })
    fireEvent.change(cpfField, { target: { value: cpfValue } })

    expect(emailField).toHaveValue(emailValue)
    expect(cpfField).toHaveValue(cpfValue)

    const okButton = screen.getByText('OK')
    fireEvent.click(okButton)

    await waitFor(() => {
      expect(sendPrimeiroAcesso).toHaveBeenCalledWith({
        cpfReceiver: cpfValue.replace(/\D/g, ''),
        emailReceiver: emailValue,
      })
    })

    await waitFor(() => {
      expect(
        screen.getByText(
          'Bora lá! Uma requisição de primeiro acesso foi encaminhada para seu e-mail.'
        )
      ).toBeInTheDocument()
    })
  })

  test('Login - Teste de inputs - API - Inputs inválidos (Rejected)', async () => {
    ;(sendPrimeiroAcesso as jest.Mock).mockRejectedValueOnce(
      new Error('Request failed')
    )
    ;(validarEmail as jest.Mock).mockReturnValue(true)
    ;(validarCPF as jest.Mock).mockReturnValue(true)

    renderComponentWithModalPrimeiroAcesso()

    const emailField = screen.getByLabelText('Email')
    const cpfField = screen.getByLabelText('CPF')

    const emailValue = 'teste@teste.com'
    const cpfValue = '123.456.789-00'

    fireEvent.change(emailField, { target: { value: emailValue } })
    fireEvent.change(cpfField, { target: { value: cpfValue } })

    expect(emailField).toHaveValue(emailValue)
    expect(cpfField).toHaveValue(cpfValue)

    const okButton = screen.getByText('OK')
    fireEvent.click(okButton)

    await waitFor(() => {
      expect(sendPrimeiroAcesso).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(
        screen.getByText(
          'Já existe uma solicitação de primeiro acesso para esse email, por favor recupere a senha!'
        )
      ).toBeInTheDocument()
    })
  })
})

describe('Login Screen - Teste de login', () => {
  test('Login - Teste de login - Inputs Vazios', async () => {
    renderComponent()

    const loginButton = screen.getByText('Acessar')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(loginAuth).not.toHaveBeenCalled()
    })
  })

  test('Login - Teste de login - Inputs preenchidos corretamente - (Resolved)', async () => {
    ;(getScreenByRole as jest.Mock).mockResolvedValue({
      data: telasPermitidasMock,
    })
    ;(account as jest.Mock).mockResolvedValue(dadosUserMock)
    ;(loginAuth as jest.Mock).mockResolvedValue('mockToken')

    renderComponent()

    const loginField = screen.getByLabelText('Login')
    const passwordField = screen.getByLabelText('Senha')

    fireEvent.change(loginField, { target: { value: 'admin' } })
    fireEvent.change(passwordField, { target: { value: 'admin' } })

    const loginButton = screen.getByText('Acessar')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(loginAuth).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(account).toHaveBeenCalledWith('mockToken')
    })

    await waitFor(() => {
      expect(getScreenByRole).toHaveBeenCalledWith(dadosUserMock.userRole)
    })
  })

  test('Login - Teste de login - Inputs preenchidos corretamente - (Reject)', async () => {
    ;(getScreenByRole as jest.Mock).mockRejectedValueOnce(
      new Error('Request failed')
    )
    renderComponent()

    const loginField = screen.getByLabelText('Login')
    const passwordField = screen.getByLabelText('Senha')

    fireEvent.change(loginField, { target: { value: 'admin' } })
    fireEvent.change(passwordField, { target: { value: 'admin' } })

    const loginButton = screen.getByText('Acessar')
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(loginAuth).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(account).not.toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(getScreenByRole).not.toHaveBeenCalled()
    })
  })
})
