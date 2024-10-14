import * as React from 'react'
import BackgroundDefault from '../../components/BackgroundDefault'
import { stylesTelaInicial } from '../../utils/styles'
import { styled } from '@mui/material/styles'

function generate(element: any) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  )
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: '#343434',
}))

export default function TelaInicial() {
  return (
    <React.Fragment>
      <BackgroundDefault>
        <div>
          <div style={stylesTelaInicial.telaInicial}></div>
        </div>
      </BackgroundDefault>
    </React.Fragment>
  )
}
