import { useSelector } from 'react-redux'
import { User } from '../interfaces/User'

interface RootState {
  persistedReducer: {
    user: User
    nicknameUser: string
    imageUser: string
    telasPermitidas: any
    paginaAtual: string
    token: string
  }
}

// export function useGetReducer(key: keyof RootState['persistedReducer']) {
//   // const { user } = useSelector((state: RootState) => state?.persistedReducer)

//   // const nicknameUser = useSelector(
//   //   (state: RootState) => state?.persistedReducer.nicknameUser.payload
//   // )

//   // const imageUser = useSelector(
//   //   (state: RootState) => state?.persistedReducer.imageUser.payload
//   // )

//   // const telasPermitidas = useSelector(
//   //   (state: RootState) => state.persistedReducer.telasPermitidas
//   // )

//   // return { user, nicknameUser, imageUser, telasPermitidas }
//   const value = useSelector((state: RootState) => state.persistedReducer[key])

//   return value
// }

export function useGetReducer<T extends keyof RootState['persistedReducer']>(
  key: T
): RootState['persistedReducer'][T] {
  const value = useSelector((state: RootState) => state.persistedReducer[key])
  return value
}

export function useGetAllReducers() {
  const persistedReducer = useSelector(
    (state: RootState) => state.persistedReducer
  )

  return persistedReducer
}
