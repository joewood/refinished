import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Slider from "react-slick"
import { ContentfulHeaderBanner } from "../generated/graphql"

const settings = {
    dots: true,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
}

interface Props {
    bannerData: ContentfulHeaderBanner[]
}

const Banner: React.FC<Props> = ({ bannerData }) => (
    <div className="slider-section">
        <Slider {...settings}>
            {bannerData.map((banner, i) => (
                <div key={i} className="item">
                    <div className="site-Banner">
                        <Img sizes={banner.image!.fluid as any} alt={banner.id} />
                        <div className="Banner-details">
                            <div>
                                <span className="sub-title">{banner.subHeading}</span>
                                <h1>{banner.title}</h1>
                                <Link to="/store">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    </div>
)

export default Banner
