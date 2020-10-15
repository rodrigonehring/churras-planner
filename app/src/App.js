import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import AppContext, { useAppContext } from './AppContext'
import Theme from './components/Theme'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EventPage from './pages/EventPage'

function createRoute(Component) {
  return function Protected(props) {
    const ctx = useAppContext()

    if (!ctx.user) {
      return <Redirect to="/login" />
    }

    return <Component {...props} {...ctx} />
  }
}

export default function App() {
  return (
    <Theme>
      <AppContext>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={createRoute(HomePage)} />
            <Route path="/event/:id" exact component={createRoute(EventPage)} />
            <Route path="/login" exact component={LoginPage} />

            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </AppContext>
    </Theme>
  )
}
