import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'

export default function DialogEvent() {
  return (
    <Dialog open maxWidth="sm" fullWidth>
      <form>
        <DialogTitle>Adicionar evento</DialogTitle>
        <DialogContent>
          <TextField fullWidth required variant="outlined" label="Título" />
          <br />
          <br />
          <TextField fullWidth required variant="outlined" label="Descrição" />
          <br />
          <br />
          <TextField fullWidth required variant="outlined" label="Data" type="date" />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button>Cancelar</Button>
          <Button variant="outlined" color="primary">
            Criar Evento
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
