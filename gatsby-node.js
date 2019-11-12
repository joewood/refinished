var path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const StoreTemplate = path.resolve("src/templates/details.js")
    const { errors, data } = await graphql(`
        {
            allContentfulProduct {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `)
    if (errors) {
        throw Error(result.errors)
    }
    for (const edge of data.allContentfulProduct.edges) {
        createPage({
            path: edge.node.slug,
            component: StoreTemplate,
            context: {
                slug: edge.node.slug,
            },
        })
    }
    return
}
