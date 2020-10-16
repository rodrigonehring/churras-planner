import React, { useMemo } from 'react'
import { Box, ButtonBase } from '@material-ui/core'
import IconPerson from '@material-ui/icons/Person'
import IconMoney from '@material-ui/icons/AttachMoney'

function prettyDate(str) {
  const date = new Date(str)

  return `${date.getDate()}/${date.getMonth() + 1}`
}

export default function EventCard({
  sortkey,
  title,
  date,
  history,
  suggestedPayment,
  suggestedPaymentDrink,
  biggerMode,
  guests
}) {
  const handleClick = () => history && history.push(`/event/${sortkey}`)

  const total = useMemo(
    () =>
      guests.reduce(
        (acc, curr) => (!curr.paid ? acc : acc + (curr.willDrink ? suggestedPaymentDrink : suggestedPayment)),
        0
      ),
    [guests, suggestedPaymentDrink, suggestedPayment]
  )

  return (
    <Box
      bgcolor="white"
      boxShadow={3}
      borderRadius={4}
      width="100%"
      textAlign="left"
      onClick={handleClick}
      component={history ? ButtonBase : undefined}
    >
      <Box p={2} width="100%" textAlign="left" display="flex" justifyContent="space-between" fontFamily="Roboto">
        <Box>
          <Box fontWeight="bold" fontSize={20} pb={1}>
            {prettyDate(date)}
          </Box>
          <Box fontSize={biggerMode ? 32 : 16} fontWeight="bold">
            {title}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Box fontSize={15} display="flex" alignItems="center">
            <IconPerson color="primary" /> {guests.length}
          </Box>
          <Box fontSize={15} display="flex" alignItems="center">
            <IconMoney color="primary" /> {total}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
