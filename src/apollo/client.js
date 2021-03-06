import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { AUTH_QUERY, REDIRECT_QUERY } from './queries'

const defaultState = {
  isAuthenticated: false,
  user: null,
  redirectPath: null,
}

const client = new ApolloClient({
  fetch,
  uri: process.env.GATSBY_APOLLO_SERVER_URI,
  clientState: {
    defaults: defaultState,
  },
  request: operation => {
    const token = localStorage.getItem('token')
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    }
  },
})

client.onResetStore(() =>
  client.cache.writeData({
    data: defaultState,
  })
)

export const setAuthenticatedUser = userData => {
  client.cache.writeData({
    data: {
      isAuthenticated: true,
      user: { __typename: 'user', ...userData },
    },
  })
}

export const isAuthenticated = () => {
  const { isAuthenticated: authenticated } = client.readQuery({
    query: AUTH_QUERY,
  })
  return authenticated
}

export const logOutUser = async () => {
  localStorage.removeItem('token')
  console.log('resetting store...')
  await client.resetStore()
}

export const setRedirectPath = redirectPath => {
  client.cache.writeData({
    data: {
      redirectPath,
    },
  })
}

export const getRedirectPath = () => {
  const { redirectPath } = client.readQuery({
    query: REDIRECT_QUERY,
  })
  return redirectPath
}

export default client
