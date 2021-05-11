import React from "react"
//import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"

const GenerateThumbnail = ({ category }) => {
  if( category === "travel" ){
    return (<div className="nothumbnail-thumbnail thumbnail-travel"><span role="img" aria-label="travel">&#x2708;</span></div>)
  } else if( category === "tech" ){
    return (<div className="nothumbnail-thumbnail thumbnail-tech"><span role="img" aria-label="computer">&#x1f4bb;</span></div>)
  } else if( category === "book" ){
    return (<div className="nothumbnail-thumbnail thumbnail-book"><span role="img" aria-label="travel">&#x1f4d6;</span></div>)
  } else if( category === "hike" ){
    return (<div className="nothumbnail-thumbnail thumbnail-hike"><span role="img" aria-label="mountain">&#x26f0;</span></div>)
  } else if( category === "life" ){
    return (<div className="nothumbnail-thumbnail thumbnail-life"><span role="img" aria-label="house">&#x1f3e0;</span></div>)
  } else{
    return (<div className="nothumbnail-thumbnail thumbnail-others"><span role="img" aria-label="smile">&#x1f600;</span></div>)
  }
}

export default GenerateThumbnail
