import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import Img from "gatsby-image"
import ModalSeach from "../components/modalSearch";
import Menu from "../components/menu";
import { Cross as Hamburger } from 'hamburger-react'


const Header = ({ siteTitle }) => {

  //小西Stateで自分で作る ここから
  const [isOpen, setOpen] = useState(false)
  //小西Stateで自分で作る ここまで

  const data = useStaticQuery(graphql`
    query QueryHeader {
      imgLogo:file(relativePath: {eq: "logo.png"}) {
          childImageSharp{
              fluid(maxWidth: 54, quality: 85) {
                  ...GatsbyImageSharpFluid
              }
          }
      },
    }
  `)

  return (
  <header id="commonHeader">
    <div className="headerInner">
      <h1>
        <Link
          to="/"
        >
          <Img fluid={data.imgLogo.childImageSharp.fluid} alt={siteTitle} className="ImgHeaderLogo" style={{width: "54px", height: "54px"}} />
        </Link>
      </h1>
      <nav>
        <ModalSeach />
        <Hamburger toggled={isOpen} toggle={setOpen} style={{}} />
          <Menu open={isOpen} setOpen={setOpen} />
      </nav>
    </div>
  </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
