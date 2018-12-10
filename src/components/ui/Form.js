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

  button[type='submit'] {
    background-color: #7f9c7d;
    box-sizing: border-box;
    color: #fff;
    border: 2px solid #fff;
    padding: 0.3rem 0;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: #fff;
      color: #7f9c7d;
      border-color: #7f9c7d;
    }
  }
`
