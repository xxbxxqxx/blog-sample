import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import marked from "marked";
//import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

marked.setOptions({
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const blogPost = ({ data, location }) => {
  const post = data.contentfulBlogSamplePost;
  return (
    <Layout>
      <SEO title={`${post.title} | xxbxxqxx`} />
      <div className="post">
        {post.thumbnail && //もしサムネイル画像をもっていれば
          <Img
          fluid={post.thumbnail.fluid}
          className="thumbnail"
          />
        }
        <div className="container">
          <div className="main">
            <div className="postContent">
              <h1>{post.title}</h1>
              <p className="post__meta">
                {post.category.title} | <span className="post__date">
                {post.publishedAt 
                      ? post.publishedAt
                      : post.createdAt
                    }
                </span>
              </p>
              <div className="body-text">
                {/*documentToReactComponents(post.content.json, options)*/}
                <div className="body-text" dangerouslySetInnerHTML={{ __html: marked(post.content.content) }} />
              </div>
            </div>
            {post.tags
              && <div className="TagsWrapper">
                  <ul>
                    {post.tags.map(({ title, slug }) =>
                      <li><Link to={`/tag/${slug}`} >#{title}</Link></li>
                    )}
                  </ul>
                </div>
            }
            <div className="buttonBMCPostWrapper">
              <p>もし記事がお役に立ちましたら、サポートいただけると嬉しいです。</p>
              <a href="https://www.buymeacoffee.com/xxbxxqxx" target="_blank" rel="noreferrer">
                <Img fluid={data.imgBuyMeACoffee.childImageSharp.fluid} alt="Buy Me A Coffee" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default blogPost;
export const pageQuery = graphql`
  query( $slug: String ) {
    contentfulBlogSamplePost(slug: { eq: $slug }) {
      id
      title
      content{
        content
      }
      thumbnail{
        fluid(maxWidth : 2000, quality: 75) {
        ...GatsbyContentfulFluid_withWebp
        }
      }
      category {
        slug
        title
      }
      tags {
        slug
        title
      }
      publishedAt(formatString: "YYYY/MM/DD")
      createdAt(formatString: "YYYY/MM/DD")
    }
    imgBuyMeACoffee:file(relativePath: {eq: "BMCLogoMark.png"}) {
        childImageSharp{
          fluid(maxWidth: 300, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
    }
  }
`;