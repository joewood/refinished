import React, { useCallback } from "react"
import { Link, graphql, history } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"
import { Item } from "../components/item"

const IndexPage = data => (
    <Layout>
        <SEO title="Home" keywords={[`furniture`, `shop`, `restored`, `classic`]} />
        <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
        <div className="container">
            <div className="text-center">
                <h2 className="with-underline">Latest Items</h2>
            </div>
            <div className="row product-main">
                {data.data.allContentfulProduct.edges.map(items => (
                    <Item node={items.node} />
                ))}
            </div>
        </div>
    </Layout>
)

export default IndexPage

export const query = graphql`
    query AboutQuery {
        allContentfulProduct(limit: 6, sort: { fields: createdAt, order: DESC }) {
            edges {
                node {
                    id
                    name
                    slug
                    image {
                        fluid(maxWidth: 1000) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                        }
                    }
                    price
                    details {
                        childMarkdownRemark {
                            excerpt(pruneLength: 140)
                        }
                    }
                }
            }
        }
        allContentfulHeaderBanner {
            edges {
                node {
                    title
                    subHeading
                    image {
                        fluid(maxWidth: 1800) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                        }
                    }
                }
            }
        }
    }
`
