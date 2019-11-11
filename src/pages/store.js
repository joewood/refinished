import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import StarRatingComponent from "react-star-rating-component"

class IndexPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            NoOfPost: 6,
        }
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = () => {
        var lastScrollY = window.pageYOffset + 1100

        if (lastScrollY > window.outerHeight) {
            var count = this.state.NoOfPost + 3
            this.setState({
                NoOfPost: count,
            })
        }
    }

    render() {
        const { data } = this.props
        const { NoOfPost } = this.state

        return (
            <React.Fragment>
                <div className="row product-main" onScroll={this.onScrollEvent}>
                    {data.data.allContentfulProduct.edges
                        .slice(0, NoOfPost)
                        .map(({ node }) => (
                            <div
                                className="Catalogue__item col-sm-12 col-md-6 col-lg-4"
                                key={node.id}
                            >
                                <div className="details_List">
                                    {node.image === null ? (
                                        <div className="no-image">No Image</div>
                                    ) : (
                                        <Img sizes={node.image.fixed} />
                                    )}

                                    <h2
                                        style={{
                                            flex: "0 0 auto",
                                            paddingTop: 10,
                                            paddingLeft: 10,
                                        }}
                                    >
                                        <Link to={`/${node.slug}`}>
                                            {node.name}
                                        </Link>
                                    </h2>
                                    <p
                                        style={{
                                            flex: "1 0 auto",
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                        }}
                                    >
                                        {
                                            node.details.childMarkdownRemark
                                                .excerpt
                                        }
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
                                            <span className="price">
                                                ${node.price || 0}
                                            </span>
                                        </div>
                                        <div style={{ flex: "0 0 auto" }}>
                                            <a
                                                href="#"
                                                className="Product snipcart-add-item"
                                            >
                                                <i className="fas fa-shopping-bag" />
                                                Contact About Item
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </React.Fragment>
        )
    }
}

const IndexPage = data => (
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
                    #    rating
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
