import { Link, graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Layout from './layout'

const ProfileImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
`

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
      <ProfileImageContainer>
        <img src={avatar} alt={name} />
      </ProfileImageContainer>
      <p>{location}</p>
      <div dangerouslySetInnerHTML={{ __html: bio }} />
      <div style={{ marginTop: '2rem' }}>
        <Link to="/partners">Browse all partner profiles</Link>
      </div>
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
