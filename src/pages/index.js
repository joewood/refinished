import React, { useCallback } from "react"
import { Link, graphql, history } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Banner from "../components/banner"

const Item = ({ node }) => {
    const onClick = useCallback(() => history.push(node.slug))
    return (
        <div
            className="Catalogue__item col-sm-12 col-md-6 col-lg-4"
            key={node.id}
        >
            <div className="details_List">
                {node.image === null ? (
                    <div className="no-image">No Image</div>
                ) : (
                    <a href={"/" + node.slug}>
                        <Img sizes={node.image.fluid} />
                    </a>
                )}

                <h2
                    style={{
                        flex: "0 0 auto",
                        paddingTop: 10,
                        paddingLeft: 10,
                    }}
                >
                    <Link to={`/${node.slug}`}>{node.name}</Link>
                </h2>
                <p
                    style={{
                        flex: "1 0 auto",
                        paddingLeft: 10,
                        paddingRight: 10,
                    }}
                >
                    {node.details.childMarkdownRemark.excerpt}
                </p>
                <div
                    style={{
                        flex: "0 0 auto",
                        display: "flex",
                        margin: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ flex: "0 0 auto" }}>
                        <span className="price">${node.price || 0}</span>
                    </div>
                    <div style={{ flex: "0 0 auto" }}>
                        <a href="#" className="Product snipcart-add-item">
                            <i className="fas fa-shopping-bag" />
                            Contact About Item
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const IndexPost = ({ data }) => (
    <>
        <div className="row product-main">
            {data.data.allContentfulProduct.edges.map(items => (
                <Item node={items.node} />
            ))}
        </div>
    </>
)

const IndexPage = data => (
    <Layout>
        <SEO
            title="Home"
            keywords={[`furniture`, `shop`, `restored`, `classic`]}
        />
        <Banner BannerData={data.data.allContentfulHeaderBanner.edges} />
        {/* <LatestBlogs data={data.data.allContentfulBlogs} /> */}
        <div className="container">
            <div className="text-center">
                <h2 className="with-underline">Latest Items</h2>
            </div>
            <IndexPost data={data}></IndexPost>
        </div>
        {/* <Countdown data={data.data.contentfulDealCountDown} /> */}
    </Layout>
)

export default IndexPage

export const query = graphql`
    query AboutQuery {
        allContentfulProduct(
            limit: 6
            sort: { fields: createdAt, order: DESC }
        ) {
            edges {
                node {
                    id
                    name
                    slug
                    #     rating
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
        # contentfulDealCountDown {
        #   title
        #   featureImage {
        #     fluid(maxWidth: 1800) {
        #       base64
        #       aspectRatio
        #       src
        #       srcSet
        #       srcWebp
        #       srcSetWebp
        #       sizes
        #     }
        #   }
        #   date(formatString: "D MMMM, YYYY")
        # }
        # allContentfulBlogs(limit: 3, sort: { fields: createdAt, order: DESC }) {
        #   edges {
        #     node {
        #       id
        #       title
        #       slug
        #       featureImage {
        #         fluid(maxWidth: 1120) {
        #           base64
        #           aspectRatio
        #           src
        #           srcSet
        #           srcWebp
        #           srcSetWebp
        #           sizes
        #         }
        #       }
        #     }
        #   }
        # }
    }
`
