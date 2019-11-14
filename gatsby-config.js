var dotenv = require("dotenv")
dotenv.config()

const { spaceId, accessToken } = process.env

module.exports = {
    siteMetadata: {
        title: `Refined Refinished`,
        description: `Restored Furniture`,
        author: `@woodjoe`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-typescript",
        // "gatsby-plugin-typegen",
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `RefinedRefinished`,
                short_name: `refinished`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/refined-refinished.png`,
            },
        },
        {
            resolve: "gatsby-source-contentful",
            options: {
                spaceId,
                accessToken,
            },
        },
        // {
        //   resolve: "gatsby-plugin-snipcart",
        //   options: {
        //     apiKey: snipcart,
        //     autopop: true,
        //   },
        // },
    ],
}
