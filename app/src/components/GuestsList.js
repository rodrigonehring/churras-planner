import React from 'react'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Checkbox
} from '@material-ui/core'
import IconDrink from '@material-ui/icons/LocalBar'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconDelete from '@material-ui/icons/Delete'

const ITEM_HEIGHT = 48

function MoreMenu({ onRemove }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
      >
        <MenuItem onClick={() => onRemove() && handleClose()}>
          <IconDelete color="primary" style={{ marginRight: 8 }} /> Deletar
        </MenuItem>
        <MenuItem onClick={() => window.alert('Não implementado ;)')}>
          <IconDelete color="primary" style={{ marginRight: 8 }} /> Editar
        </MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    marginTop: -5,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2]
  }
}))

export default function GuestsList({
  guests,
  handleRemoveGuest,
  handleUpdateGuest,
  suggestedPaymentDrink,
  suggestedPayment
}) {
  const classes = useStyles()

  if (guests.length === 0) {
    return (
      <div className={classes.root}>
        <Box p={4}>
          <Typography>Nenhum convidado adicionado ainda D:</Typography>
        </Box>
      </div>
    )
  }

  return (
    <List className={classes.root}>
      {guests.map((value, i) => {
        const labelId = `checkbox-list-label-${value.id}`

        return (
          <ListItem
            key={labelId}
            role={undefined}
            dense
            button
            onClick={() => handleUpdateGuest({ ...value, paid: !value.paid })}
            divider={i !== guests.length - 1}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.paid || false}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name || value.sortkey} />
            <ListItemSecondaryAction>
              <Box display="flex" alignItems="center">
                {value.willDrink && (
                  <Box mr={1}>
                    <IconDrink color="primary" />
                  </Box>
                )}
                R$ {value.willDrink ? suggestedPaymentDrink : suggestedPayment}
                <MoreMenu onRemove={() => handleRemoveGuest(value)} />
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
