import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import Layout from './layout'

const Profile = props => {
  const { handle, name } = props.data.mongodbMarketplaceProfiles

  return (
    <Layout>
      <h1>{name}</h1>
    </Layout>
  )
}

export default Profile

export const query = graphql`
  query ProfileQuery($handle: String!) {
    mongodbMarketplaceProfiles(handle: { eq: $handle }) {
      mongodb_id
      handle
      email
      name
      avatar
    }
  }
`
