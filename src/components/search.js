import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ShowPosts from "../components/showPosts"
import TextField from '@material-ui/core/TextField';

const SearchResult = props => {
  const tempData = useStaticQuery(graphql`
      query SearchData {
        allContentfulBlogPostForSeach: allContentfulBlogSamplePost(
          filter: {node_locale: {eq: "en-US"}}
          sort: {fields: createdAt, order: DESC}
        ) {
          edges {
            node {
              title
              slug
              category{
                slug
                title
              }
              publishedAt(formatString: "YYYY/MM/DD")
              createdAt(formatString: "YYYY-MM-DD")
            }
          }
        }
    }
  `)

  const className = useState("")
  const allPosts = tempData.allContentfulBlogPostForSeach.edges
  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })
  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const posts = tempData.allContentfulBlogPostForSeach.edges || []

    const filteredData = posts.filter(post => {
      const title = post.node.title
      return (
        title.toLowerCase().includes(query.toLowerCase())
      )
    })
    setState({
      query,
      filteredData,
    })
  }
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const result = hasSearchResults ? filteredData : allPosts

  return (
    <div className={className}>
      <div className="searchInputWrapper">
        <TextField
          id="standard-basic"
          label="記事を探す"
          ariaLabel="Search"
          onChange={handleInputChange}
        />
      </div>
      <div className="result-inner">
        <div className="result-inner__res">
          {query !== "" ?
            query + " の検索結果: " + result.length + "件"
            : result.length + "件の記事があります"
          }
        </div>
        <div className="result-inner__search">
          <ShowPosts
            postEdges={result}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResult