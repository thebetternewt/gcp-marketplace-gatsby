const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMongodbMarketplaceProfiles {
          edges {
            node {
              website
              location
              bio
              handle
              mongodb_id
              name
              email
              avatar
            }
          }
        }
      }
    `).then(results => {
      results.data.allMongodbMarketplaceProfiles.edges.forEach(({ node }) => {
        createPage({
          path: `partners/${node.handle}`,
          component: path.resolve('./src/components/Profile.js'),
          context: {
            handle: node.handle,
          },
        })
      })
      resolve()
    })
  })
}
