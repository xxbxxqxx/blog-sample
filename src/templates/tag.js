import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
//import Img from "gatsby-image";
import SEO from "../components/seo"
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import ShowPosts from "../components/showPosts"

const TaggedPosts = ({ data, location, pageContext }) => {
  const posts = data.allContentfulBlogPostTagged.edges;

  return (
  <Layout>
    <SEO title="デモサイト | Classmethod" />
    <div className={`Home-page${pageContext.currentPage}`}>
      <div className="container containerTop">
        <h2>#{pageContext.title} の記事</h2>
        <ShowPosts
          postEdges={posts}
        />
        <Pagination
          page={pageContext.currentPage}
          count={pageContext.pageTotal}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/${item.page === 1 ? '' : `${item.page}`}`}
              {...item}
            />
          )}
        />
      </div>
    </div>
  </Layout>
  );
};
export default TaggedPosts

export const query = graphql`
  query TaggedPosts($slug: String!) {
    allContentfulBlogPostTagged: allContentfulBlogSamplePost(
      sort: {fields: publishedAt, order: DESC}
      filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
    ){
      edges {
        node {
          title
          slug
          content{
            content
          }
          thumbnail {
            fluid(maxWidth : 400, maxHeight : 200, resizingBehavior: FILL, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
            description
          }
          category{
            slug
            title
          }
          tags{
            slug
            title
          }
          publishedAt(formatString: "YYYY/MM/DD")
          createdAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;