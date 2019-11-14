import React, { DetailsHTMLAttributes } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

import { ContentfulProduct, ContentfulHeaderBanner } from "../generated/graphql"

interface Props {
    data: {
        allContentfulHeaderBanner: {
            edges: ContentfulHeaderBanner
        }
        contentfulProduct: ContentfulProduct
    }
}

const ProductDetails: React.FC<Props> = ({ data }) => (
    <Layout>
        <SEO title={data.contentfulProduct.name || ""} keywords={[`gatsby`, `application`, `react`]} />
        <div className="container details-page">
            <div className="product-details">
                <div className="Product-Screenshot">
                    {data.contentfulProduct.productMorePhotos === null ? (
                        <div className="no-image">No Image</div>
                    ) : (
                        <Tabs>
                            {(data.contentfulProduct.productMorePhotos || []).map(
                                photo =>
                                    (photo && (
                                        <TabPanel key={photo.id}>
                                            <Tab>
                                                <img src={(photo.fixed && photo.fixed.src) || ""} alt={photo.id} />
                                            </Tab>
                                        </TabPanel>
                                    )) ||
                                    null
                            )}
                            <TabList>
                                {(data.contentfulProduct.productMorePhotos || []).map(
                                    photo =>
                                        (photo && (
                                            <Tab key={photo.id}>
                                                <img src={(photo.fixed && photo.fixed.src) || ""} alt={photo.id} />
                                            </Tab>
                                        )) ||
                                        null
                                )}
                            </TabList>
                        </Tabs>
                    )}
                </div>
                <div>
                    <h2>{data.contentfulProduct.name}</h2>
                </div>
                <div className="row buynowinner">
                    <div className="col-sm-2">
                        <span className="price">Price: ${data.contentfulProduct.price}</span>
                    </div>
                    <div className="col-sm-10 text-left">
                        <a
                            href={
                                "/contact-us?name=" +
                                encodeURIComponent((data.contentfulProduct && data.contentfulProduct.name) || "")
                            }
                            className="Product"
                        >
                            <i className="fas fa-tags" />
                            Contact Us
                        </a>
                    </div>
                </div>
                {(data.contentfulProduct.details && data.contentfulProduct.details.childMarkdownRemark && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.contentfulProduct.details.childMarkdownRemark.html || "",
                        }}
                    />
                )) ||
                    null}
            </div>
        </div>
    </Layout>
)

export default ProductDetails

export const query = graphql`
    query ProductDetailsQuery($slug: String!) {
        contentfulProduct(slug: { eq: $slug }) {
            id
            name
            slug
            image {
                fixed(width: 1120, height: 500) {
                    width
                    height
                    src
                    srcSet
                }
            }
            price
            details {
                childMarkdownRemark {
                    html
                }
            }
            productMorePhotos {
                id
                fixed(width: 1120, height: 600) {
                    src
                }
            }
            #rating
        }
    }
`
