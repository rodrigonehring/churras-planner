import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import EventCard from '../components/EventCard'
import Layout from '../components/Layout'
import DialogEvent from '../components/DialogEvent'

export default function HomePage({ location, request, history }) {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({ events: null })

  useEffect(() => {
    async function init() {
      const { events } = await request('/events')
      setState({ events })
      setLoading(false)
    }

    init()
  }, [location.key, request])

  return (
    <Layout title="Agenda de Churras" maxWidth="md" loading={loading}>
      <DialogEvent />
      {state.events && (
        <Grid container spacing={2}>
          {state.events.map((i) => (
            <Grid item xs={12} key={i.sortkey} sm={6} bgcolor="primary">
              <EventCard {...i} history={history} />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  )
}
