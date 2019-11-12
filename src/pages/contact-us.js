import Layout from "../components/layout"
import SEO from "../components/seo"

import React, { useState, useCallback } from "react"
import { navigate } from "gatsby-link"
import q from "query-string"

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}

async function submitFOrm(form, formState) {
    try {
        const post = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": form.getAttribute("name"),
                ...formState,
            }),
        })
        navigate(form.getAttribute("action"))
    } catch (e) {
        navigate("/")
    }
}

export default function Contact({ location, ...other }) {
    const [state, setState] = useState({})
    const handleChange = useCallback(
        e => {
            setState({ ...state, [e.target.name]: e.target.value })
        },
        [state]
    )
    const queryStr = (location.search && q.parse(location.search)) || {}
    const handleSubmit = useCallback(
        e => {
            e.preventDefault()
            const form = e.target
            submitFOrm(form, state)
        },
        [state]
    )

    return (
        <Layout>
            <SEO title="Contact Us" keywords={[`gatsby`, `application`, `react`]} />
            <div className="Contact-us">
                <div className="container">
                    <form
                        name="contact"
                        method="post"
                        action="/thanks/"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                    >
                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                        <input type="hidden" name="form-name" value="contact" />
                        <p hidden>
                            <label>
                                Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                            </label>
                        </p>
                        <div>
                            <label>
                                Your name:
                                <br />
                                <input type="text" name="name" onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Your email:
                                <br />
                                <input type="email" name="email" onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Message:
                                <br />
                                <textarea
                                    name="message"
                                    onChange={handleChange}
                                    value={
                                        (queryStr.name &&
                                            `Hi, I'm interested to know more about your ${queryStr.name}. Please contact me on the email address above.`) ||
                                        ""
                                    }
                                />
                            </label>
                        </div>
                        <div>
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

// class Contact extends React.Component {
//     render() {
//         return (
//             <Layout>
//                 <div className="Contact-us">
//                     <div className="container">
//                         {/* To make form work, use your own formspree credentials in action="" */}
//                         <form action="https://formspree.io/youremail@domain.com" method="POST" name="contact">
//                             <div>
//                                 <label>Your Name: </label>
//                                 <input type="text" name="name" />
//                             </div>
//                             <div>
//                                 <label>Your Email: </label>
//                                 <input type="email" name="email" />
//                             </div>
//                             <div>
//                                 <label>Message: </label>
//                                 <textarea name="message"></textarea>
//                             </div>
//                             <div>
//                                 <button type="submit">Send</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Layout>
//         )
//     }
// }

// export default Contact
