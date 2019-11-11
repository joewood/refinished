import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Item } from "../components/item"

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
                    {data.data.allContentfulProduct.edges.slice(0, NoOfPost).map(({ node }) => (
                        <Item node={node} />
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
