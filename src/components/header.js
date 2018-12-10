import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

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
  height: 40px;
  padding: 0 15px;
  box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.3);
`

const Header = ({ siteTitle }) => (
  <div>
    <HeaderColorBar>
      <div />
      <div />
      <div />
    </HeaderColorBar>
    <HeaderContainer>
      <i className="fal fa-cog" />
      <i className="fal fa-bars" />
    </HeaderContainer>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
