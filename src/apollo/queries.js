import { gql } from 'apollo-boost'

export const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
    user @client {
      name
    }
  }
`

export const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`

// Users
const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      name
      email
    }
  }
`
