import { gql } from 'apollo-boost'

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

export const CREATE_PROFILE = gql`
  mutation CreateProfile(
    $handle: String!
    $bio: String!
    $website: String
    $location: String
  ) {
    createProfile(
      handle: $handle
      bio: $bio
      website: $website
      location: $location
    ) {
      id
    }
  }
`
