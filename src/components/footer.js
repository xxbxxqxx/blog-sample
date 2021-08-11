
import { useStaticQuery, graphql, Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"
//import ImageStatic from "../components/imageStatic";
//import ImageBlur from "../components/imageBlur";
//import Img from "gatsby-image"

const Footer = ({ siteTitle }) => {
  const CategoryData = useStaticQuery(graphql`
    query CategoryData {
      allContentfulBlogSampleCategory(
          filter: {node_locale: {eq: "en-US"}}
      ) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  const allCategories = CategoryData.allContentfulBlogSampleCategory.edges

  return (
  <footer>
    <div className="container flex-row ">
      <div className="footer-content-copyright flex-column-6">
        Copyright © Classmethod Inc., and Classmethod (Europe) GmbH
      </div>
      <div className="footer-content-links flex-column-6 flex-row">
        <div className="flex-column-6">
          <p className="footer-subtitle">Category</p>
          <ul>
            {allCategories && allCategories.map(({ node: category }) => {
              return(
                <li key={category.title + "saaa"}><Link to={`/category/${category.slug}/`}>{category.title}</Link></li>
              )
            })}
          </ul>
        </div>
        <div className="flex-column-6">
          <p className="footer-subtitle">About Classmethod</p>
          <ul>
            <li><a href="https://classmethod.jp/">コーポレートサイト</a></li>
            <li><a href="https://dev.classmethod.jp/">DevelopersIO</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
