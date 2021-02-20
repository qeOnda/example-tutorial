/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            title
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      let tit = node.title
      string = tit.replace(/\s+/g, '-')
      createPage({
        path: `/article/${string}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          title: node.title,
        },
      })
    })
  });

  const getAuthors = makeRequest(graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id
            username
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.username}`,
        component: path.resolve(`src/templates/author.js`),
        context: {
          username: node.username,
        },
      })
    })
  });

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getAuthors,
  ])
};