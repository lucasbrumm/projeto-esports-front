import { InputMask } from '@react-input/mask'

export function TextMaskCPF(props: { [x: string]: any; inputRef: any }) {
  const { inputRef, ...other } = props

  const style = {
    backgroundColor: 'transparent', // Define o fundo como transparente
  }

  return (
    <InputMask mask="___-___-___.__" replacement={{ _: /\d/ }} {...other} />
  )
}
