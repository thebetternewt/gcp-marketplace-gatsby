import '@fortawesome/fontawesome-pro/css/all.css'

import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from './src/apollo/client'

import checkToken from './src/util/checkToken'

if (typeof window !== 'undefined') {
  checkToken()
}

export const wrapRootElement = ({ element, props }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
