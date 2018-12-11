import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  input,
  button[type='submit'] {
    border-radius: 5px;
  }

  input {
    border: 1px solid #ddd;
    margin-bottom: 1rem;
  }
`
