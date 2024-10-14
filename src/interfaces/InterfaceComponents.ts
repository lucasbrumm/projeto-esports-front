import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Field } from './Field'
import { CSSProperties } from 'react'

export interface ButtonDefaultProps {
  label: string
  action: () => void
  marginTopCustom?: number
  widthCustom?: number
}

export interface CardProps {
  data: any[]
}

export interface IDataCards {
  icon: JSX.Element | null
  text: string
}

export interface IconeProps {
  nome: string
  size: number
}

export interface ModalDefaultProps {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  titleModal: string
  modalText: string
  hasInput?: boolean
  hasButton?: boolean
  action: () => void
  buttonText: string
  inputData?: any[]
  hasLoading?: boolean
  loading?: boolean
}

export interface RadioGroupDefaultProps {
  data: any[]
  setValue: (value: any) => void
  styleTitle: any
  styleText: any
  formLabel: string
}

export interface TextFormProps {
  data: Field[]
  responseForm: any
  setResponseForm: (value: any) => void
  widthField: number | string
  colorText: string
  colorInput: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning'
  colorTextInput: string
  maxHeightField?: number
  heightField?: number
}

export interface IconTextFieldProps {
  icon?: IconDefinition
  actionClick?: () => void
  tooltipString?: string
  position?: 'start' | 'end' | undefined
  isPassword?: boolean
  showPassword?: boolean
}

export interface ITextFieldGroup {
  id: number
  label: string
  value: string
  variant: 'standard' | 'outlined' | 'filled'
  type: string
  onChange: (e: any) => void
  onKeyDown?: (e: any) => void
  style?: CSSProperties
  focused: boolean
  InputProps?: any
  inputProps?: any
}
