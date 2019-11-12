import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Thanks = () => (
    <Layout>
        <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
        <div className="site-About">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Thanks</h2>
                        <p>We will be in touch shortly.</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)

export default Thanks
