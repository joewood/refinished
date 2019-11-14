import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

interface Props {
    node: any
}

export const Item: React.FC<Props> = ({ node }) => {
    return (
        <div className="Catalogue__item col-sm-12 col-md-6 col-lg-4" key={node.id}>
            <div className="details_List">
                {node.image === null ? (
                    <div className="no-image">No Image</div>
                ) : (
                    <a href={"/" + node.slug}>
                        <Img sizes={node.image.fluid || node.image.fixed} />
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
                        <a href={"/contact-us?name=" + encodeURIComponent(node.name)} className="Product">
                            <i className="fas fa-shopping-bag" />
                            Contact About Item
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
