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

async function submitForm(form, formState) {
    try {
        const body = encode({
            "form-name": form.getAttribute("name"),
            ...formState,
        })
        console.log("Bodu " + body)
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
    const queryStr = (location.search && q.parse(location.search)) || {}
    const defaultMessage =
        (queryStr.name &&
            `Hi, I'm interested to know more about your ${queryStr.name}. Please contact me on the email address above.`) ||
        ""
    const [formState, setFormState] = useState({ message: defaultMessage })
    console.log("Form", formState)
    const handleChange = useCallback(
        ({ target }) => {
            setFormState({ ...formState, [target.name]: target.value })
        },
        [formState]
    )
    const handleSubmit = useCallback(
        e => {
            e.preventDefault()
            const form = e.target
            submitForm(form, formState)
        },
        [formState]
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
                                <input type="text" autoFocus name="name" onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Your email:
                                <br />
                                <input type="email" minLength={5} name="email" onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Message:
                                <br />
                                <textarea name="message" onChange={handleChange} defaultValue={defaultMessage} />
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
