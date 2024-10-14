import * as React from 'react'
import BackgroundDefault from '../../components/BackgroundDefault'
import { stylesAgendamento } from '../../utils/styles'
import { Typography } from '@mui/material'
import Calendar from 'react-calendar'
import '../agendamento/Agendamento.css'

export default function Agendamento() {
  const [valueCalendar, onChangeCalendar] = React.useState(new Date())
  return (
    <React.Fragment>
      <BackgroundDefault>
        <div>
          <div style={stylesAgendamento.telaAgendamento}>
            <Typography style={stylesAgendamento.titulo}>MENU</Typography>
            {/* <Calendar className={"react-calendar"} onChange={(e) => onChangeCalendar} value={valueCalendar} /> */}
          </div>
        </div>
      </BackgroundDefault>
    </React.Fragment>
  )
}
