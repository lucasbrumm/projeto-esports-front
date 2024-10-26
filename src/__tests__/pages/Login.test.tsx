import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { IDadosUsuario } from '../../interfaces/User'
import { store } from '../../redux/store'
import Login, {
  checkboxLembrarSenhaTestId,
  inputsLoginScreenDataTestId,
} from '../../pages/login/Login'
import { atentaLogoTestId } from '../../components/BackgroundUser'
import { iconTextFieldTestId } from '../../components/IconTextField'

const dadosUserTest: IDadosUsuario = {
  id: 1,
  cpf: '12345678900',
  email: 'lucas@lucas.com',
  nome: 'Lucas',
  userRole: 1,
  enabled: true,
  firstAccess: false,
}

jest.mock('../../services/api/auth', () => ({
  account: jest.fn().mockResolvedValue(dadosUserTest),
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

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  )
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

  // test('Login - Exibe snackbar de erro', async () => {
  //   const loginButton = screen.getByText('Acessar')
  //   fireEvent.click(loginButton)

  //   await waitFor(() => {
  //     expect(screen.getByRole('alert')).toBeInTheDocument()
  //   })
  // })

  // test('Login - Primeiro Acesso modal', () => {
  //   const primeiroAcessoButton = screen.getByText('Primeiro Acesso')
  //   fireEvent.click(primeiroAcessoButton)

  //   expect(screen.getByText('Primeiro Acesso')).toBeInTheDocument()
  //   expect(screen.getByLabelText('Email')).toBeInTheDocument()
  //   expect(screen.getByLabelText('CPF')).toBeInTheDocument()
  // })

  // test('Login - Solicitar Primeiro Acesso', async () => {
  //   const primeiroAcessoButton = screen.getByText('Primeiro Acesso')
  //   fireEvent.click(primeiroAcessoButton)

  //   const emailField = screen.getByLabelText('Email')
  //   const cpfField = screen.getByLabelText('CPF')
  //   const okButton = screen.getByText('OK')

  //   fireEvent.change(emailField, { target: { value: 'test@test.com' } })
  //   fireEvent.change(cpfField, { target: { value: '123.456.789-00' } })
  //   fireEvent.click(okButton)

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(
  //         'Bora lá! Uma requisição de primeiro acesso foi encaminhada para seu e-mail.'
  //       )
  //     ).toBeInTheDocument()
  //   })
  // })
})
