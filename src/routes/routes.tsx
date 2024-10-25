import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useLocation,
  Outlet,
} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../utils/themeDefault'
import { Fragment } from 'react'
import { isAuthenticated, isFistAcess } from './helper'
import { SidebarAndHeader } from '../components/SidebarAndHeader'

import Login from '../pages/login/Login'
import Cadastro from '../pages/cadastro/Cadastro'
import Home from '../pages/home/Home'
import Protected from './protected'
import Public from './public'
import PaginaNaoEncontrada from '../pages/pagina-nao-encontrada/PaginaNaoEncontrada'
import Perfil from '../pages/perfil/Perfil'
import EditarDados from '../pages/editar-dados/EditarDados'
import ProtectedFirstAcess from './protectedFirstAcess'

const SideBarJSX = () => {
  const location = useLocation()
  return (
    <Fragment>
      <SidebarAndHeader location={location} />
      <Outlet />
    </Fragment>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SideBarJSX />}>
      <Route>
        <Route element={<Protected />}>
          <Route
            path="/fagammon-esports/home"
            element={<ProtectedFirstAcess />}
          >
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/fagammon-esports/cadastro"
            element={<Cadastro />}
            loader={async () => await isFistAcess()}
          />
          <Route path="/fagammon-esports/perfil" element={<Perfil />} />
          <Route
            path="/fagammon-esports/editar-dados"
            element={<EditarDados />}
          />
        </Route>

        <Route element={<Public />}>
          <Route
            path="/fagammon-esports/not-found"
            element={<PaginaNaoEncontrada />}
          />
          <Route path="*" element={<PaginaNaoEncontrada />} />
          <Route
            path="/fagammon-esports"
            element={<Login />}
            loader={async () => await isAuthenticated()}
          />
        </Route>
      </Route>
    </Route>
    // <Route element={<SideBarJSX />}>
    //   <Route path="*" element={<Teste />}></Route>
    // </Route>
  )
)

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<SideBarJSX />}>
//       <Route>
//         <Route element={<Protected />}>
//           <Route
//             path="/fagammon-esports/home"
//             element={<ProtectedFirstAcess />}
//           >
//             <Route index element={<Home />} />
//           </Route>
//           <Route
//             path="/fagammon-esports/cadastro"
//             element={<Cadastro />}
//             loader={async () => await isFistAcess()}
//           />
//         </Route>
//         <Route element={<Public />}>
//           <Route
//             path="/fagammon-esports/not-found"
//             element={<PaginaNaoEncontrada />}
//           />
//           <Route path="*" element={<PaginaNaoEncontrada />} />
//           <Route
//             index
//             path="/fagammon-esports/"
//             element={<Login />}
//             loader={async () => await isAuthenticated()}
//           />
//         </Route>
//       </Route>
//     </Route>
//   )
// )

const RoutesApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default RoutesApp
