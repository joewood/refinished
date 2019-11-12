import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../css/font-awesome.css"
import "bootstrap/dist/css/bootstrap.css"
import "../css/style.css"
import SEO from "../components/seo"
import logo from "../images/refined-refinished.png"

const Header = ({ siteTitle }) => (
    <header className="site-header">
        <SEO></SEO>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4 align-self-center">
                    <Link className="header-logo" to="/">
                        <img src={logo} alt="header"></img>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-8 align-self-center">
                    <nav>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/store">
                                    Store
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact-us">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header
