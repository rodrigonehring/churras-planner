import React, { useState } from 'react'
import { Button, TextField, Typography, Paper, makeStyles } from '@material-ui/core'
import Layout from '../components/Layout'
import { useAppContext } from '../AppContext'

const useStyles = makeStyles(() => ({
  paper: { padding: 32 },
  field: { marginBottom: 32 }
}))

export default function LoginPage({ history }) {
  const classes = useStyles()
  const { onLogin } = useAppContext()
  const [state, setState] = useState({ email: '', password: '', error: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setState((s) => ({ ...s, error: '', submitting: true }))

    try {
      await onLogin({ email: state.email, password: state.password }, () => history.push('/'))
    } catch (error) {
      setState((s) => ({ ...s, error: error.message, submitting: false }))
    }
  }

  const handleChange = ({ target }) =>
    setState((s) => ({ ...s, error: '', [target.name]: target.value }))

  return (
    <Layout title="Agenda de Churras" maxWidth="xs">
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          {state.error && (
            <Typography color="error" varinat="button">
              {state.error}
            </Typography>
          )}

          <TextField
            type="email"
            required
            label="email"
            variant="outlined"
            name="email"
            value={state.email}
            onChange={handleChange}
            fullWidth
            className={classes.field}
            disabled={state.submitting}
          />

          <TextField
            type="password"
            required
            label="senha"
            variant="outlined"
            name="password"
            onChange={handleChange}
            fullWidth
            className={classes.field}
            disabled={state.submitting}
          />

          <Button variant="outlined" color="secondary" type="submit" disabled={state.submitting}>
            {state.submitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </Layout>
  )
}
