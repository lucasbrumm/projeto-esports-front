import ExitIcon from '@mui/icons-material/ExitToApp'
import HomeIcon from '@mui/icons-material/Home'
import AddUserIcon from '@mui/icons-material/PersonAddAltSharp'
import EditUserIcon from '@mui/icons-material/ManageAccounts'
import NotiticationIcon from '@mui/icons-material/MarkUnreadChatAltOutlined'
import ImageIcon from '@mui/icons-material/InsertPhotoOutlined'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ScienceIcon from '@mui/icons-material/Science'
import ArticleIcon from '@mui/icons-material/Article'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import { IconeProps } from '../interfaces/InterfaceComponents'

const Icone = ({ nome, size }: IconeProps) => {
  const fontSize = {
    width: size ?? 40,
    fontSize: size ?? 40,
  }

  const iconeBranco = (
    <div style={{ paddingLeft: '3px' }}>
      <div
        style={{
          backgroundColor: '#FFF',
          color: '#FFF',
          ...fontSize,
          height: size,
          border: '2px solid #0e3568',
          borderRadius: '50%',
        }}
      />
    </div>
  )

  const icones: { [key: string]: JSX.Element } = {
    inicio: <HomeIcon style={fontSize} />,
    adicionarUsuario: <AddUserIcon style={fontSize} />,
    metricaAcesso: <LeaderboardIcon style={fontSize} />,
    gerirUsuario: <EditUserIcon style={fontSize} />,
    enviarNotificacoes: <NotiticationIcon style={fontSize} />,
    gerirBanners: <ImageIcon style={fontSize} />,
    gerirVistorias: <AssignmentIcon style={fontSize} />,
    geracaoDemandas: <ScienceIcon style={fontSize} />,
    sair: <ExitIcon style={{ ...fontSize, transform: 'rotate(180deg)' }} />,
    NAO_INICIADA: <Brightness1Icon style={{ color: '#a3a3a3', ...fontSize }} />,
    NAO_INICIADA_BRANCO: iconeBranco,
    INICIADA: <Brightness1Icon style={{ color: '#0e3568', ...fontSize }} />,
    EM_PERIODO: <Brightness1Icon style={{ color: '#fac849', ...fontSize }} />,
    EM_ATRASO: <Brightness1Icon style={{ color: '#e85757', ...fontSize }} />,
    REALIZADA: <Brightness1Icon style={{ color: '#4f9743', ...fontSize }} />,
    REALIZADA_APROVADA_CLIENTE: (
      <CheckCircleIcon style={{ color: '#4f9743', ...fontSize }} />
    ),
    detalhes: <InfoIcon style={fontSize} />,
    lupa: <SearchIcon style={{ color: '#a3a3a3', ...fontSize }} />,
    x: <CloseIcon style={{ color: '#a3a3a3', ...fontSize }} />,
    video: <PlayCircleFilledIcon style={fontSize} />,
    left: <ArrowBackIosIcon style={{ color: '#FFF', ...fontSize }} />,
    right: <ArrowForwardIosIcon style={{ color: '#FFF', ...fontSize }} />,
    resumo: <ArticleIcon style={fontSize} />,
    info: <InfoOutlinedIcon style={{ color: '#0e3568', ...fontSize }} />,
    default: <></>,
  }

  return icones[nome] ?? icones['default']
}

export default Icone
