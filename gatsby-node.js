var path = require("path")

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  const StoreTemplate = path.resolve("src/templates/details.js")
  // const BlogTemplate = path.resolve("src/templates/blogDetails.js")
  const result = await graphql(`
    {
      allContentfulProduct {
        edges {
          node {
            id
            slug
          }
        }
      }
      #      allContentfulBlogs {
      #        edges {
      #          node {
      #            id
      #            slug
      #          }
      #        }
      #      }
    }
  `)
  if (result.errors) {
    throw Error(result.errors)
  }
  for (const edge of result.data.allContentfulProduct.edges) {
    createPage({
      path: edge.node.slug,
      component: StoreTemplate,
      context: {
        slug: edge.node.slug,
      },
    })
  }
  // result.data.allContentfulBlogs.edges.forEach(data => {
  //   createPage({
  //     path: data.node.slug,
  //     component: BlogTemplate,
  //     context: {
  //       slug: data.node.slug,
  //     },
  //   })
  // })
  return
}
