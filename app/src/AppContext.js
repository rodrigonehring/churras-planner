import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

const Context = createContext()
// const PREFIX = 'https://9pu4bdh4x8.execute-api.sa-east-1.amazonaws.com/prod'
// @todo: Colocar em process.env
const PREFIX = 'http://localhost:3000'

/**
 * helper pra poder usar com um import só
 */
export function useAppContext() {
  return useContext(Context)
}

/**
 * Gerencia o user logado + passar o token fake nos requests
 */
export default function AppContext({ children }) {
  const [state, setState] = useState({ user: { hashkey: 'rodrigonehring@gmail.com' } })

  const onLogin = useCallback(async (body, cb) => {
    const { user } = await api('/login', { method: 'post', body })
    setState({ user })
    setTimeout(cb, 100)
  }, [])

  const request = useCallback(
    (path, params) => {
      return api(path, { ...params, token: state.user.hashkey })
    },
    [state.user]
  )

  const value = useMemo(
    () => ({
      user: state.user,
      onLogin,
      request
    }),
    [state, onLogin, request]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

const catcher = async (res) => {
  if (res.status > 490) throw res.statusText
  const body = await res.json()
  if (res.status > 390) throw body
  return body
}

/**
 * Deixei a api junto, já que só será ser usado junto mesmo, unico request public é o login
 * depois precisa de token, então vou deixar passar pelo AppContext
 */
async function api(path, { method = 'get', body, token }) {
  const url = PREFIX + path
  const params = { method, headers: { 'Content-Type': 'application/json' } }

  if (body) {
    params.body = JSON.stringify(body)
  }

  if (token) {
    params.headers.Authorization = token
  }

  return fetch(url, params).then(catcher)
}
