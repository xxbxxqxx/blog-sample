import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Img from "gatsby-image";
import marked from "marked";
//import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import fetch from "node-fetch"

marked.setOptions({
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const BlogPost = ({ data, location }) => {
  const post = data.contentfulBlogSamplePost;

  useEffect(() => {
    // get data from GitHub api
    console.log("ここから")
    fetch(`/api/hello`)
      .then(ressss => {console.log(JSON.stringify(ressss.json().data))}) // parse JSON from request
  }, [])

  return (
    <Layout>
      <SEO title={`${post.title} | Classmethod デモサイト`} />
      <div className="post">
        <div style={{textAlign: "center"}}>
        {post.cloudinaryThumbnail
          ? <img src={post.cloudinaryThumbnail[0].original_url} style={{maxWidth: "1200px"}} />
          : post.thumbnail && <img src={post.thumbnail.file.url} style={{maxWidth: "1200px"}} />
        }
        </div>
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
            {/*post.tags
              && <div className="TagsWrapper">
                  <ul>
                    {post.tags.map(({ title, slug }) =>
                      <li><Link to={`/tag/${slug}`} >#{title}</Link></li>
                    )}
                  </ul>
                </div>
            */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default BlogPost;
export const pageQuery = graphql`
  query( $slug: String ) {
    contentfulBlogSamplePost(slug: { eq: $slug }) {
      id
      title
      content{
        content
      }
      category {
        slug
        title
      }
      cloudinaryThumbnail {
        url
        original_url
      }
      thumbnail {
        file {
          url
        }
      }
      tags {
        slug
        title
      }
      publishedAt(formatString: "YYYY/MM/DD")
      createdAt(formatString: "YYYY/MM/DD")
    }
  }
`;