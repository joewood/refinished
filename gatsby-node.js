var path = require("path")

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const storeTemplate = path.resolve("src/templates/details.tsx")
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
        throw Error(errors)
    }
    for (const edge of data.allContentfulProduct.edges) {
        createPage({
            path: edge.node.slug,
            component: storeTemplate,
            context: {
                slug: edge.node.slug,
            },
        })
    }
    return
}
