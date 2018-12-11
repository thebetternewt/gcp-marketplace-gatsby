import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import { Mutation } from 'react-apollo'
import jwtDecode from 'jwt-decode'
import {
  isAuthenticated,
  setAuthenticatedUser,
  getRedirectPath,
  setRedirectPath,
} from '../../apollo/client'
import { LOGIN } from '../../apollo/mutations'

import { Form } from '../ui/Form'
import { Button } from '../ui/Buttons'

class LogIn extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const { email, password } = this.state

    console.log('auth:', isAuthenticated())
    if (isAuthenticated()) {
      return <Redirect noThrow to="/" />
    }

    return (
      <div>
        <h1>Log In</h1>
        <Mutation mutation={LOGIN} variables={{ email, password }}>
          {(login, { loading, data, error }) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              console.log(error)
            }
            if (data) {
              const token = data.login
              localStorage.setItem('token', token)
              setAuthenticatedUser(jwtDecode(token))

              // Handle friendly redirect
              const path = getRedirectPath()
              if (path) {
                setRedirectPath(null)
                return <Redirect noThrow to={path} />
              }

              return <Redirect noThrow to="/" />
            }
            return (
              <Form
                onSubmit={async e => {
                  e.preventDefault()
                  const token = await login()
                  console.log(token)
                }}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                />
                <Button type="submit">Log In</Button>
                {error &&
                  error.graphQLErrors.map(({ message }, i) => (
                    <p key={i} style={{ color: 'red' }}>
                      {message}
                    </p>
                  ))}
              </Form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default LogIn
