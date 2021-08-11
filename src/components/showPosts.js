import React from 'react';
import { Link } from "gatsby";
import Img from "gatsby-image";
import GenerateThumbnail from "../components/generateThumbnail"

const Posts = ({ postEdges, postPageContext }) => {
  return (
    <div className="posts-basic">
      {postEdges && postEdges.map(({ node: post }) => {
        return (
          <Link to={`/post/${post.slug}/`} className="post-item flex-row">
            <div className="flex-column-6 post-item-thumbnail">
            {post.cloudinaryThumbnail
              ? <img src={post.cloudinaryThumbnail[0].original_url} style={{width: "100%"}} />
              : post.thumbnail && <img src={post.thumbnail.file.url} style={{width: "100%"}} />
            }
            </div>
            <div className="flex-column-6 post-item-text">
              <p className="post__meta">
                {post.category.title} | <span className="post-basic-postedat post__date">
                  {post.publishedAt 
                    ? post.publishedAt
                    : post.createdAt
                  }
                </span>
              </p>
              <h3>{post.title}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
export default Posts;