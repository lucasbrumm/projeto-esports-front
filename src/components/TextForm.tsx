import { TextField, Typography } from '@mui/material'
import { stylesTextForm, inputProps } from '../utils/styles'
import { getCEP } from '../services/api/externalApi'
import { validaCEP } from '../utils/helper'
import { TextFormProps } from '../interfaces/InterfaceComponents'
import { Field } from '../interfaces/Field'

function TextForm({
  data,
  responseForm,
  setResponseForm,
  widthField,
  colorText,
  colorInput,
  colorTextInput,
  maxHeightField,
  heightField,
}: TextFormProps) {
  async function findCep(numberCep: string) {
    if (validaCEP(numberCep)) {
      return
    }
    const cep = await getCEP({ cep: numberCep })
    setResponseForm({
      ...responseForm,
      rua: cep?.logradouro,
      bairro: cep?.bairro,
      cidade: cep?.localidade,
      estado: cep?.uf,
    })
  }

  function returnValue(field: Field) {
    const fieldValue = field.value
    return responseForm[fieldValue] || ''
  }

  function setValues(field: Field, value: string) {
    const fieldValue = field.value
    setResponseForm({ ...responseForm, [fieldValue]: value })
  }

  return (
    <>
      {data?.map((field) => (
        <div
          key={field.id}
          style={{
            ...stylesTextForm.fieldsForm,
            ...{
              width: widthField,
              maxHeight: maxHeightField || undefined,
              height: heightField || undefined,
            },
          }}
        >
          <Typography
            style={{ ...stylesTextForm.textForm, ...{ color: colorText } }}
          >
            {field?.label}:{' '}
          </Typography>
          <TextField
            color={colorInput}
            required={field?.required}
            type={JSON.parse(field?.type).type}
            variant='standard'
            disabled={field?.disabled}
            focused
            value={returnValue(field)}
            onChange={(e) => setValues(field, e.target.value)}
            onBlur={
              field?.value === 'cep'
                ? () => findCep(returnValue(field))
                : undefined
            }
            inputProps={{
              ...inputProps,
              style: { color: colorTextInput },
            }}
            style={stylesTextForm.styleTextFields}
          />
          {field.moreField && (
            <div style={stylesTextForm.moreField}>
              <Typography
                style={{ ...stylesTextForm.textForm, ...{ color: colorText } }}
              >
                {JSON.parse(field?.moreField).label}
              </Typography>
              <TextField
                value={returnValue(JSON.parse(field?.moreField))}
                onChange={(e) =>
                  setValues(JSON.parse(field?.moreField), e.target.value)
                }
                type={JSON.parse(field?.moreField).type}
                variant='standard'
                focused
                inputProps={{ ...inputProps, min: 1 }}
                style={{
                  ...stylesTextForm.moreFieldTextField,
                  width: JSON.parse(field?.moreField).width,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default TextForm
