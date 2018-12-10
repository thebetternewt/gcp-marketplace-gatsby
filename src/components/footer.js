import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

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

  .footer-logo {
    width: 130px;
    margin-bottom: 1rem;
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

  i {
    font-size: 1.5rem;
  }
`

export default () => (
  <StaticQuery query={FOOTER_IMAGE_QUERY}>
    {data => (
      <>
        <Footer>
          <div className="footer-logo">
            <Img fluid={data.gcpLogo.childImageSharp.fluid} />
          </div>
          <span>
            {' '}
            <i className="fal fa-copyright" /> {new Date().getFullYear()} Garden
            City Project
          </span>
        </Footer>
        <UserFooterNav>
          <i className="fal fa-home" />
          <i className="fal fa-plus-square" />
          <i className="fal fa-user-circle" />
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
