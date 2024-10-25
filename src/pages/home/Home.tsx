// import { useDispatch } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import BallotIcon from '@mui/icons-material/Ballot'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import HistoryIcon from '@mui/icons-material/History'
import BlockIcon from '@mui/icons-material/Block'
import Cards from '../../components/Cards'
// import { getnicknameAndImage } from '../../services/api/user'
// import { setImageUser, setNicknameUser } from '../../redux/reducer'
import './home.css'
import { useGetReducer } from '../../hooks/useGetReducer'
import { IDataCards } from '../../interfaces/InterfaceComponents'

export default function Home() {
  // const dispatch = useDispatch()
  const user = useGetReducer('user')
  // const imageUser = useGetReducer('imageUser')
  // const nicknameUser = useGetReducer('nicknameUser')

  const [data, setData] = useState<IDataCards[]>([
    {
      icon: null,
      text: '',
    },
  ])

  // const handleGetUserImageNickname = useCallback(
  //   async (userId: number) => {
  //     try {
  //       const imageAndNickname = await getnicknameAndImage(userId)
  //       if (imageAndNickname) {
  //         dispatch(setImageUser(imageAndNickname.imageBase64))
  //         dispatch(setNicknameUser(imageAndNickname.nickname))
  //       }
  //     } catch (error) {
  //       console.error('Erro ao buscar imagem do usuário', error)
  //     }
  //   },
  //   [dispatch]
  // )

  const AdminHome = () => {
    const dataCards: IDataCards[] = [
      {
        icon: <BallotIcon sx={{ fontSize: 80 }} />,
        text: 'Acesso e gerenciamento das salas de treino',
      },
      {
        icon: <RecentActorsIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse o perfil e gerencie os jogadores da equipe SUPER USUÁRIO',
      },
      {
        icon: <BlockIcon sx={{ fontSize: 80 }} />,
        text: 'Veja a lista de jogadores bloqueados',
      },
      {
        icon: <NotificationsActiveIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse a aba de comunicados',
      },
      {
        icon: <HistoryIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse o histórico de partida e as estatísicas',
      },
    ]

    setData(dataCards)
  }

  const TreinadorHome = () => {
    const dataCards: IDataCards[] = [
      {
        icon: <BallotIcon sx={{ fontSize: 80 }} />,
        text: 'Acesso e gerenciamento das  salas de treino',
      },
      {
        icon: <RecentActorsIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse o perfil e gerencie os jogadores da equipe',
      },
      {
        icon: <NotificationsActiveIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse a aba de comunicados  ',
      },
      {
        icon: <HistoryIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse o histórico de partida e as estatísicas',
      },
    ]

    setData(dataCards)
  }

  const PlayerHome = () => {
    const dataCards: IDataCards[] = [
      {
        icon: <BallotIcon sx={{ fontSize: 80 }} />,
        text: 'Acesso as salas de treino',
      },
      {
        icon: <NotificationsActiveIcon sx={{ fontSize: 80 }} />,
        text: 'Comunicados do treinador',
      },
      {
        icon: <HistoryIcon sx={{ fontSize: 80 }} />,
        text: 'Acesse seu hitórico de partidas',
      },
    ]

    setData(dataCards)
  }

  useEffect(() => {
    switch (user?.userRole) {
      case 1:
        AdminHome()
        break
      case 2:
        TreinadorHome()
        break
      default:
        PlayerHome()
        break
    }
  }, [user])

  return (
    <Fragment>
      <div className="tela-inicial">
        <Cards data={data} />
      </div>
    </Fragment>
  )
}
