import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout' 

const ArticleTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/${data.strapiArticle.author.username}`}>{data.strapiArticle.author.username}</Link></p>
    <Img fluid={data.strapiArticle.image.childImageSharp.fluid}/>
    <p>{data.strapiArticle.content}</p>
  </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($title: String!) {
    strapiArticle(title: {eq: $title}) {
      title
      content
      image {
          childImageSharp {
            fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
            }
          }
        }
      author {
        id
        username
      }
    }
  }
`