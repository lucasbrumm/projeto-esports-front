import { InputMask } from '@react-input/mask'

export function TextMaskCPF(props: { [x: string]: any; inputRef: any }) {
  const { inputRef, ...other } = props

  return (
    <InputMask mask="___-___-___.__" replacement={{ _: /\d/ }} {...other} />
  )
}
