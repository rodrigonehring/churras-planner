import React from 'react'
import { TextField } from '@material-ui/core'

export default function Input({ field, form, disabled, helperText, maxLength, inputProps, ...props }) {
  const touched = form.touched[field.name]
  const error = (form.submitCount || touched) && form.errors[field.name]

  const fieldProps = {
    fullWidth: true,
    variant: 'outlined',
    ...props,
    disabled: disabled || form.isSubmitting,
    helperText: error || helperText,
    error: Boolean(error),
    ...field,
    value: field.value || '',
    inputProps: {
      ...inputProps,
      maxLength: maxLength ? maxLength : ''
    },
    onChange: props.onChange ? props.onChange : field.onChange
  }

  return <TextField {...fieldProps} />
}
