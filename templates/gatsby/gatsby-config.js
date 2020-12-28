// Site configuration options
// https://www.gatsbyjs.org/docs/gatsby-config/

const { resolve } = require('path');

const config = require('./siteConfig');

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    {
      options: {
        background_color: config.background,
        display: 'standalone',
        icon: 'src/images/icon.png',
        name: config.title,
        short_name: config.shortName,
        start_url: '/',
        theme_color: config.theme,
      },
      resolve: 'gatsby-plugin-manifest',
    },
    {
      options: {
        develop: false,
        ignore: ['/src/styles/critical.css'],
        keyframes: true,
        printRejected: true,
        tailwind: true,
      },
      resolve: 'gatsby-plugin-purgecss',
    },
    {
      options: {
        host: config.siteUrl,
        policy: [
          {
            allow: '/',
            userAgent: '*',
          },
        ],
        sitemap: `${config.siteUrl}sitemap.xml`,
      },
      resolve: 'gatsby-plugin-robots-txt',
    },
    {
      options: {
        defaultQuality: 100,
        stripMetadata: true,
      },
      resolve: 'gatsby-plugin-sharp',
    },
    {
      options: {
        prettier: true,
        svgo: true,
        svgoConfig: {
          plugins: [{ cleanupIDs: true }, { removeViewBox: true }],
        },
      },
      resolve: 'gatsby-plugin-svgr',
    },
    {
      options: {
        allExtensions: true,
        isTSX: true,
      },
      resolve: 'gatsby-plugin-typescript',
    },
    {
      options: {
        name: 'data',
        path: resolve(__dirname, 'src/data'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'images',
        path: resolve(__dirname, 'src/images'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        commonmark: true,
        footnotes: true,
        gfm: true,
        pedantic: true,
        plugins: [
          'gatsby-remark-smartypants',
          {
            options: {
              maxWidth: 512,
            },
            resolve: 'gatsby-remark-images',
          },
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
  ],
  siteMetadata: {
    author: config.author,
    description: config.description,
    language: config.language,
    siteUrl: config.siteUrl,
    theme: config.theme,
    title: config.title,
  },
};
