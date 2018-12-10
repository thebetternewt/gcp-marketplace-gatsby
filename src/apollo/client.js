import ApolloClient from 'apollo-boost'
import { AUTH_QUERY } from './queries'

const defaultState = {
  isAuthenticated: false,
  user: null,
  redirectPath: null,
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
    data: {
      isAuthenticated: false,
    },
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

// export const getRedirectPath = () => {
//   const { redirectPath } = client.readQuery({
//     query: REDIRECT_QUERY,
//   })
//   return redirectPath
// }

export default client
