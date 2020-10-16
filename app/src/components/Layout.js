import React from 'react'
import { Container, makeStyles, Typography, Box, Button, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#f1f2f6',
    minHeight: '100vh',
    position: 'relative'
  },
  pattern: {
    opacity: 0.06,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: 507,
    background: 'url(food-pattern.png)',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    top: 0
  },
  content: {
    position: 'relative',
    zIndex: 2,
    height: '100%'
  },
  loading: {
    position: 'fixed',
    zIndex: 9999,
    height: '100%',
    width: '100%',
    background: 'rgba(255,255,255,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function Layout({ children, title, maxWidth = 'sm', loading, onActionAdd }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      <div className={classes.pattern} />
      <Box
        component="header"
        zIndex={2}
        position="relative"
        p={8}
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" color="primary" align="center">
          {title}
        </Typography>

        {onActionAdd && (
          <Box pt={2}>
            <Button color="primary" variant="outlined" onClick={onActionAdd}>
              Adicionar
            </Button>
          </Box>
        )}
      </Box>

      <div className={classes.content}>
        <Container maxWidth={maxWidth}>{children}</Container>
      </div>
    </div>
  )
}
