import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { isAuthenticated, logOutUser } from '../apollo/client'

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

const HeaderColorBar = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 10px;

  & > div {
    flex-basis: 33%;
    flex-grow: 1;
  }

  & > div:first-child {
    background-color: #5e5e5f;
  }
  & > div:nth-child(2) {
    background-color: #7f9c7d;
  }
  & > div:nth-child(3) {
    background-color: #9eb5b3;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;

  i {
    font-size: 1.5rem;
  }
`

const HeaderNav = styled.nav`
  display: none;
  margin-left: auto;
  justify-content: flex-end;
  align-items: center;

  a {
    display: block;
    position: relative;
    margin-left: 15px;
    text-decoration: none;
    color: inherit;
    padding-bottom: 5px;
    &.active:after {
      display: block;
      position: absolute;
      bottom: 3px;
      left: 0;
      content: ' ';
      width: 100%;
      height: 2px;
      background-color: #9eb5b3;
    }
  }

  @media screen and (min-width: 700px) {
    display: flex;
  }
`

// TODO: Figure out appropriate hit area (margin/padding) for menu toggle
const HeaderMenuToggle = styled.button`
  margin-left: auto;
  border: none;
  padding: 3px 0 3px 15px;
  background-color: transparent;
  @media screen and (min-width: 700px) {
    display: none;
  }
`
// TODO: Get rid of !important
const LoginLink = styled(Link)`
  background-color: #7f9c7d;
  border-radius: 5px;
  padding: 5px 15px;
  margin-left: 15px;

  color: #fff !important;
`

const LogoutLink = styled.button`
  display: block;
  margin-left: 15px;
  color: inherit;
  padding: 0;
  padding-bottom: 5px;
  background: none;
  border: none;
  cursor: pointer;
`

const Header = ({ siteTitle }) => {
  const authLinks = (
    <>
      <Link to="/profile" activeClassName="active">
        Profile
      </Link>
      <LogoutLink
        onClick={async () => {
          await logOutUser()
          navigate('/')
        }}
      >
        Logout
      </LogoutLink>
    </>
  )
  const nonAuthLinks = (
    <>
      <Link to="/sign-up" activeClassName="active">
        Sign Up
      </Link>
      <LoginLink to="/log-in">Log In</LoginLink>
    </>
  )

  return (
    <HeaderWrapper>
      <HeaderColorBar>
        <div />
        <div />
        <div />
      </HeaderColorBar>
      <HeaderContainer>
        <i
          className="fal fa-cog"
          style={{ display: isAuthenticated() ? 'block' : 'none' }}
        />
        <HeaderNav>
          <Link to="/" activeClassName="active">
            Home
          </Link>
          <Link to="/partners" activeClassName="active">
            Partners
          </Link>
          {isAuthenticated() ? authLinks : nonAuthLinks}
        </HeaderNav>

        <HeaderMenuToggle>
          <i className="fal fa-bars" />
        </HeaderMenuToggle>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
