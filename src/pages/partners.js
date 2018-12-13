import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import { Form } from '../components/ui/Form'
import { Button } from '../components/ui/Buttons'

const SecondPage = ({ data }) => {
  const profileLinks = data.allMongodbMarketplaceProfiles.edges.map(
    ({ node }) => (
      <li key={node.mongodb_id}>
        {node.name} (<Link to={`/partners/${node.handle}`}>view</Link>)
      </li>
    )
  )

  return (
    <Layout>
      <h1>Partners</h1>
      <Form>
        {/* <label>Search</label> */}
        <input type="text" placeholder="Search..." />
        <Button type="submit">Search Profiles</Button>
      </Form>
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
