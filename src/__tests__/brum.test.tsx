import { render, screen } from '@testing-library/react'
import Login from '../pages/login/Login'
import { IDadosUsuario } from '../interfaces/User'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { MemoryRouter } from 'react-router-dom'

const dadosUserTest: IDadosUsuario = {
  id: 1,
  cpf: '12345678900',
  email: 'lucas@lucas.com',
  nome: 'Lucas',
  userRole: 1,
  enabled: true,
  firstAccess: false,
}

jest.mock('../services/api/auth', () => ({
  account: {
    post: dadosUserTest,
  },
  loginAuth: {
    post: jest.fn(),
  },
}))

jest.mock('../services/api/email', () => ({
  sendPrimeiroAcesso: {
    post: jest.fn(),
  },
}))

jest.mock('../storage/localStorage', () => ({
  setDataLocalStorage: {
    post: jest.fn(),
  },
}))

jest.mock('../services/api/screen', () => ({
  getScreenByRole: {
    get: jest.fn(),
  },
}))

describe('Render Component', () => {
  test('Renderizar componente corretamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )
    screen.debug()
  })
})
