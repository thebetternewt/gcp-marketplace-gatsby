import { gql } from 'apollo-boost'

export const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`

export const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`
