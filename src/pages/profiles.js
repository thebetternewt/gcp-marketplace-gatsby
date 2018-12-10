import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const SecondPage = ({ data }) => {
  const profileLinks = data.allMongodbMarketplaceProfiles.edges.map(
    ({ node }) => (
      <li key={node.mongodb_id}>
        <Link to={`/partners/${node.handle}`}>{node.name}</Link>
      </li>
    )
  )

  return (
    <Layout>
      <h1>Profiles</h1>
      <ul>{profileLinks}</ul>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage

export const query = graphql`
  query ProfilesQuery {
    allMongodbMarketplaceProfiles {
      edges {
        node {
          mongodb_id
          handle
          email
          name
          bio
          avatar
          location
        }
      }
    }
  }
`
