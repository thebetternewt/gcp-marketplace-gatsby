import React, { Component } from 'react'

import { Form } from '../ui/Form'
import { Button } from '../ui/Buttons'

class SignUp extends Component {
  state = {
    name: '',
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
    return (
      <div>
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </div>
    )
  }
}

export default SignUp
