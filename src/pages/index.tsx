import { graphql } from "gatsby"
import React from "react"
import Banner from "../components/banner"
import { Item } from "../components/item"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AboutQueryQuery, ContentfulHeaderBanner } from "../generated/graphql"

interface Props {
    data: AboutQueryQuery
}

const IndexPage: React.FC<Props> = ({ data }) => (
    <Layout>
        <SEO title="Home" keywords={[`furniture`, `shop`, `restored`, `classic`]} />
        <Banner bannerData={data.allContentfulHeaderBanner.edges.map(n => n.node as ContentfulHeaderBanner)} />
        <div className="container">
            <div className="text-center">
                <h2 className="with-underline">Latest Items</h2>
            </div>
            <div className="row product-main">
                {data.allContentfulProduct.edges.map(items => (
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
