import React, { useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'

function InlineDatePickerDemo({ field, form, label, disabled, helperText, ...props }) {
  const touched = form.touched[field.name]
  const error = (form.submitCount || touched) && form.errors[field.name]

  const [selectedDate, handleDateChange] = useState(field.value)

  const handleChange = (date) => {
    handleDateChange(date)
    form.setFieldValue(field.name, date)
  }

  return (
    <KeyboardDatePicker
      {...props}
      autoOk
      fullWidth
      disabled={disabled}
      variant="inline"
      inputVariant="outlined"
      label={label}
      format="dd/MM/yyyy"
      error={Boolean(error)}
      helperText={error || helperText}
      value={selectedDate}
      InputAdornmentProps={{ position: 'start' }}
      onChange={handleChange}
    />
  )
}

export default InlineDatePickerDemo
