import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import Layout from './layout'

const Profile = props => {
  const {
    handle,
    name,
    location,
    avatar,
    bio,
  } = props.data.mongodbMarketplaceProfiles

  return (
    <Layout>
      <h1>{name}</h1>
      <img src={avatar} alt={name} style={{ width: 100, borderRadius: 100 }} />
      <p>{location}</p>
      <div dangerouslySetInnerHTML={{ __html: bio }} />
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
      bio
      avatar
      location
    }
  }
`
