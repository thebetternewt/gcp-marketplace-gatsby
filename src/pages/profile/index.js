import React from 'react'
import { Router, Redirect } from '@reach/router'
import { isAuthenticated } from '../../apollo/client'

import Layout from '../../components/layout'
import Profile from '../../components/profile'
import ProfileForm from '../../components/profile/ProfileForm'

const ProfileRoutes = () => {
  if (!isAuthenticated()) {
    return <Redirect to="/" noThrow />
  }

  return (
    <Layout>
      <Router>
        <Profile path="profile" />
        <ProfileForm path="profile/create" />
      </Router>
    </Layout>
  )
}

export default ProfileRoutes
