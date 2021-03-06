import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import { isAuthenticated } from '../apollo/client'

import logo from '../images/logos/gcp-logo-white.png'

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
  /* height: 130px; */
  background-color: #5e5e5f;
  color: #fff;
  font-size: 0.8rem;
  margin-bottom: 50px;

  a {
    margin-bottom: 0;
  }

  .footer-logo {
    width: 130px;
    img {
      margin-bottom: 0.5rem;
    }
  }

  span {
    margin-bottom: 0.5rem;
  }

  @media screen and (min-width: 700px) {
    /* Remove margin bottom for nav on larger screens */
    margin-bottom: 0;
  }
`

const UserFooterNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border-top: 3px solid #7f9c7d;
  background-color: #fff;
  /* box-shadow: 3px 5px 15px rgba(0, 0, 0, 0.3); */

  a {
    text-decoration: none;
    color: inherit;
  }

  i {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 700px) {
    display: none;
  }
`

export default () => (
  <StaticQuery query={FOOTER_IMAGE_QUERY}>
    {data => (
      <>
        <Footer>
          <div className="footer-logo">
            <Link to="/">
              {/* <Img fluid={data.gcpLogo.childImageSharp.fluid} /> */}
              <img src={logo} alt="Garden City Project" />
            </Link>
          </div>
          <span>
            <i className="fal fa-copyright" /> {new Date().getFullYear()} Garden
            City Project
          </span>
        </Footer>

        <UserFooterNav>
          <Link to="/">
            <i className="fal fa-home" />
          </Link>
          {isAuthenticated() && <i className="fal fa-plus-square" />}
          <Link to="/profile">
            <i className="fal fa-user-circle" />
          </Link>
        </UserFooterNav>
      </>
    )}
  </StaticQuery>
)

const FOOTER_IMAGE_QUERY = graphql`
  query {
    gcpLogo: file(relativePath: { eq: "logos/gcp-logo-white.png" }) {
      childImageSharp {
        fluid(maxWidth: 130) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
