import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => (
    <Layout>
        <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
        <div className="site-About">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>About Us</h2>
                        <p>Restoring and refinishing furniture.</p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)

export default About
