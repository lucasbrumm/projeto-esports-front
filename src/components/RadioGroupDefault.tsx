import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { RadioGroupDefaultProps } from '../interfaces/InterfaceComponents'

function RadioGroupDefault({
  formLabel,
  styleTitle,
  styleText,
  data,
  setValue,
}: RadioGroupDefaultProps) {
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label' style={styleTitle}>
        {formLabel}
      </FormLabel>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        name='radio-buttons-group'
      >
        {data?.map((item) => (
          <FormControlLabel
            key={item.id}
            style={styleText}
            value={item.value}
            control={<Radio />}
            label={item.name}
            onClick={() => setValue(item.id)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default RadioGroupDefault
