import React, { useState, useCallback, useLayoutEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Item } from "../components/item"
import { graphql } from "gatsby"
import { StoreQueryQuery } from "../generated/graphql"

interface Props {
    data: StoreQueryQuery
}

const IndexPost: React.FC<{ data: Props }> = ({ data }) => {
    const [NoOfPost, setNoOfPost] = useState(6)
    const handleScroll = useCallback(() => {
        if (typeof window === "undefined") return
        if (window.pageYOffset + 1100 > window.outerHeight) {
            setNoOfPost(NoOfPost + 3)
        }
    }, [NoOfPost])
    useLayoutEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])
    return (
        <div className="row product-main">
            {data.data.allContentfulProduct.edges.slice(0, NoOfPost).map(({ node }) => (
                <Item node={node as any} />
            ))}
        </div>
    )
}

const IndexPage: React.FC<Props> = data => (
    <Layout>
        <SEO title="Store" keywords={[`gatsby`, `application`, `react`]} />
        <div className="container store-page">
            <IndexPost data={data}></IndexPost>
        </div>
    </Layout>
)

export default IndexPage

export const query = graphql`
    query StoreQuery {
        allContentfulProduct {
            edges {
                node {
                    id
                    name
                    slug
                    image {
                        fixed(width: 1000, height: 500) {
                            width
                            height
                            src
                            srcSet
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
    }
`
