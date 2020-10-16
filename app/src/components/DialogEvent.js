import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@material-ui/core'
import TextField from './TextField'
import { Formik, Field, Form } from 'formik'
import DatePicker from './DatePicker'

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Informe seu o título!'
  } else if (values.title.length < 3) {
    errors.title = 'Informe um título maior que 3 caracteres :/'
  }

  if (!values.date) {
    errors.date = 'Precisamos decidir a data!'
  } else if (new Date() > values.date) {
    errors.date = 'Informar uma data no futuro!'
  }

  return errors
}

export default function DialogEvent({ handleCreate, open, onClose }) {
  const initialValues = {
    title: '',
    description: '',
    date: new Date(),
    suggestedPaymentDrink: 20,
    suggestedPayment: 10
  }

  const handleSubmit = async (values, form) => {
    try {
      await handleCreate({ ...values, date: values.date.toISOString() })
    } catch (error) {
      console.log('error creating :/', error)
      form.setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
        enableReinitialize
        initialErrors={null}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>Adicionar evento</DialogTitle>
            <DialogContent>
              <Field
                name="title"
                label="Título"
                helperText="Ex: Aniversário do jubileu"
                component={TextField}
                disabled={isSubmitting}
              />
              <br />
              <br />

              <Field name="description" label="Descrição" component={TextField} disabled={isSubmitting} />
              <br />
              <br />

              <Field name="date" label="Data" component={DatePicker} disabled={isSubmitting} />
              <br />
              <br />

              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Field
                    name="suggestedPayment"
                    label="Valor sugerido"
                    component={TextField}
                    disabled={isSubmitting}
                    type="number"
                  />
                </Grid>
                <Grid item sm={6}>
                  <Field
                    name="suggestedPaymentDrink"
                    label="Valor sugerido (com bebida)"
                    component={TextField}
                    disabled={isSubmitting}
                    type="number"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button variant="outlined" color="primary" type="submit" disabled={isSubmitting}>
                Criar Evento
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
