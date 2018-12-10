import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Form } from '../ui/Form'

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
    return (
      <div>
        <h1>Log In</h1>
        <Form onSubmit={this.handleSubmit}>
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
          <button type="submit">Log In</button>
        </Form>
      </div>
    )
  }
}

export default LogIn
