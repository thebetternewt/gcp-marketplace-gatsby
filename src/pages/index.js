import React from 'react'
import { Link } from 'gatsby'
import { Query } from 'react-apollo'

import Layout from '../components/layout'
import Image from '../components/image'
import { Button } from '../components/ui/Buttons'

import { isAuthenticated } from '../apollo/client'
import { AUTH_QUERY } from '../apollo/queries'

const IndexPage = () => (
  <Query query={AUTH_QUERY}>
    {({ data, loading }) => {
      console.log(data)
      let welcomeMessage = 'Hi people'
      let isAuthenticated = false

      if (data && data.user) {
        const { name } = data.user
        const firstName = name.split(' ')[0]
        welcomeMessage = `Hi ${firstName}!`
        isAuthenticated = data.isAuthenticated
      }

      return (
        <Layout>
          <h1>{welcomeMessage}</h1>
          <p>Welcome to the GCP Marketplace!</p>
          <p>Check out our partner profiles!</p>
          <Link to="/partners">Browse partner profiles</Link>
          {!isAuthenticated && (
            <div style={{ margin: '1rem 0' }}>
              <Link to="/log-in">
                <Button role="link">Log In</Button>
              </Link>
              <Link to="/sign-up">
                <Button role="link">Sign Up</Button>
              </Link>
            </div>
          )}

          <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
            <Image />
          </div>
        </Layout>
      )
    }}
  </Query>
)

export default IndexPage
