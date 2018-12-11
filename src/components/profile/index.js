import React from 'react'
import { Link } from 'gatsby'

import { Button } from '../ui/Buttons'

const Profile = () => (
  <>
    <h1>Welcome!</h1>
    <Link to="/profile/create">
      <Button role="link">Create Profile</Button>
    </Link>
  </>
)

export default Profile
