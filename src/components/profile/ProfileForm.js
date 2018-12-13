import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { isAuthenticated } from '../../apollo/client'
import { CREATE_PROFILE } from '../../apollo/mutations'
import * as colors from '../ui/Colors'
import { navigate } from 'gatsby'

// import { Form } from '../ui/Form'

const FormBox = styled.div`
  background: #fff;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.1),
    0 6px 10px 5px rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  transition: transform 100ms ease-in-out;

  &.close {
    width: 0;
    padding: 0;
    overflow: hidden;
    transition: 800ms ease-in-out;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.1);
  }
`
const PrevButton = styled.i`
  position: absolute;
  left: 30px;
  top: 12px;
  font-size: 18px;
  color: ${colors.GREY};
  float: right;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: ${colors.BLUE};
  }
`

const NextButton = styled.i`
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-size: 40px;
  color: ${({ error }) => (error ? colors.ERROR : colors.GREEN)};
  float: right;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: ${colors.BLUE};
  }
`
const InputGroup = styled.div`
  position: relative;
  padding: 50px 20px 20px;
  margin: 10px 60px 10px 10px;
  /* opacity: 0; */
  transition: opacity: 300ms ease-in-out;

  input, textarea {
    position: relative;
    width: 100%;
    border: none;
    font-size: 1rem;
    outline: 0;
    background: transparent;
    box-shadow: none;
  }

  label {
    position: absolute;
    pointer-events: none;
    top: 50px;
    left: 20px;
    font-size: 1rem;
    font-weight: bold;
    transition: all 200ms ease-in-out;
  }

  input:focus + label,
  input:active + label,
  input:valid + label,
  textarea:focus + label,
  textarea:active + label,
  textarea:valid + label {
    top: 10px;
    left: 42px;
    margin-left: 0;
    font-size: .9rem;
    font-weight: normal;
    color: ${colors.GREY}
  }


  /* Only show placeholder when input is active, valid, or in focus */
  input::placeholder {
    visibility: hidden;
  }

  input:focus,
  input:active,
  input:valid, {
    &::placeholder {
      visibility: visible;
    }
  }
`
// const InputField = styled.input``
// const InputLabel = styled.label``
const InputProgress = styled.div`
  border-bottom: 3px solid
    ${({ error }) => (error ? colors.ERROR : colors.GREEN)};
  /* width: 0; */
  transition: width 600ms ease-in-out;
`
const ProgressBar = styled.div`
  position: absolute;
  bottom: -10px;
  left: 0;
  background-color: ${colors.BLUE};
  height: 10px;
  width: ${({ complete }) => `${complete * 100}%`};
  /* width: 0; */
  transition: width 500ms ease-in-out;
`

class ProfileForm extends Component {
  state = {
    step: 0,
    handle: '',
    bio: '',
    location: '',
    website: '',
    error: null,
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  handleNextStep = () =>
    this.setState(({ step }) => ({
      step: step + 1,
    }))

  handlePrevStep = () =>
    this.setState(({ step }) => ({
      step: step - 1,
    }))

  render() {
    const { step, handle, bio, location, website, error } = this.state

    // TODO: Handle redirect if not auth in router
    if (!isAuthenticated()) {
      return <Redirect noThrow to="/" />
    }

    const steps = [
      {
        name: 'handle',
        question: 'Choose a handle.',
        info: 'This is how people will find to your profile.',
        type: 'text',
        placeholder: 'bob_smith123',
      },
      {
        name: 'bio',
        question: 'Tell us about yourself...',
        info: 'Just a short bio between 100 & 500 characters.',
        type: 'textarea',
      },
      {
        name: 'location',
        question: 'Where are you located?',
        type: 'text',
        placeholder: 'City, State',
      },
      {
        name: 'website',
        question: 'Do you have a website?',
        type: 'text',
        placeholder: 'https://mywebsite.com',
      },
    ]

    const currentStep = steps[step]

    return (
      <Mutation mutation={CREATE_PROFILE}>
        {(createProfile, { data, loading, error }) => {
          if (loading) {
            return <p>Loading...</p>
          }

          if (error) {
            console.log(error)
          }

          return (
            <FormBox>
              {step > 0 && (
                <PrevButton
                  className="fal fa-arrow-left"
                  onClick={this.handlePrevStep}
                />
              )}
              {step !== steps.length - 1 ? (
                <NextButton
                  className="fal fa-arrow-right"
                  error={!!error}
                  onClick={this.handleNextStep}
                />
              ) : (
                <NextButton
                  className="fal fa-arrow-right"
                  error={!!error}
                  onClick={async () => {
                    await createProfile({
                      variables: { handle, bio, location, website },
                    })
                    navigate('/profile')
                  }}
                />
              )}
              <InputGroup>
                {currentStep.type === 'textarea' ? (
                  <textarea
                    name={currentStep.name}
                    rows="5"
                    value={this.state[currentStep.name]}
                    onChange={this.handleChange}
                    required
                  />
                ) : (
                  <input
                    name={currentStep.name}
                    type={currentStep.type}
                    placeholder={currentStep.placeholder}
                    value={this.state[currentStep.name]}
                    onChange={this.handleChange}
                    required
                  />
                )}
                <label>{currentStep.question}</label>
                <InputProgress error={!!error} />
              </InputGroup>
              <ProgressBar complete={step / steps.length} />
            </FormBox>
          )
        }}
      </Mutation>
    )
  }
}

export default ProfileForm
