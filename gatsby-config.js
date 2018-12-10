require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'The Marketplace | Garden City Project',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#7f9c7d',
        theme_color: '#7f9c7d',
        display: 'minimal-ui',
        icon: 'src/images/logos/gcp-logo-white.png', // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        server: {
          address: process.env.MONGO_DB_SERVER,
          port: process.env.MONGO_DB_PORT,
        },
        auth: {
          user: process.env.MONGO_DB_USERNAME,
          password: process.env.MONGO_DB_PASSWORD,
        },
        extraParams: {
          replicaSet: 'Cluster0-shard-0',
          ssl: 'true',
          authSource: 'admin',
        },
        dbName: `marketplace`,
        collection: `profiles`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
