import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@material-ui/core'
import Layout from '../components/Layout'
import EventCard from '../components/EventCard'
import GuestsList from '../components/GuestsList'

export default function EventPage({ match, request }) {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({ event: null })

  const init = useCallback(async () => {
    const response = await request(`/events/${match.params.id}`)
    setState(response)
    setLoading(false)
  }, [request])

  const update = useCallback(
    async (body) => {
      setLoading(true)
      const response = await request(`/events/${match.params.id}`, { method: 'put', body })
      setState(response)
      setLoading(false)
    },
    [request]
  )

  useEffect(() => {
    init()
  }, [match.params.id, init])

  const handleAddGuest = async () => {
    const name = window.prompt('Qual o nome do convidado?')

    if (!name || !name.trim()) {
      return window.alert('Nome obrigatório')
    }

    const willDrink = window.confirm('Vai consumir bebidas alcoólicas? Será metade do valor caso positivo.')

    await update({
      ...state.event,
      guests: [{ id: Date.now(), name, willDrink }].concat(state.event.guests)
    })
  }

  const handleRemoveGuest = async (guest) => {
    await update({
      ...state.event,
      guests: state.event.guests.filter((i) => i.id !== guest.id)
    })
  }

  const handleUpdateGuest = async (guest) => {
    await update({
      ...state.event,
      guests: state.event.guests.map((i) => (i.id === guest.id ? guest : i))
    })
  }

  return (
    <Layout title="Agenda de Churras" maxWidth="md" loading={loading}>
      {state.event && (
        <>
          <EventCard {...state.event} biggerMode />
          <GuestsList {...state.event} handleRemoveGuest={handleRemoveGuest} handleUpdateGuest={handleUpdateGuest} />
        </>
      )}

      <br />
      <br />

      <Button variant="outlined" color="primary" onClick={handleAddGuest}>
        Adicionar convidado
      </Button>
    </Layout>
  )
}
