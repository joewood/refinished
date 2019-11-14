import React from "react"
import Slider from "react-slick"
import Img from "gatsby-image"
import { Link } from "gatsby"

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
    BannerData: any[]
}

const Banner: React.FC<Props> = ({ BannerData }) => (
    <div className="slider-section">
        <Slider {...settings}>
            {BannerData.map((items, i) => (
                <div key={i} className="item">
                    <div className="site-Banner">
                        <Img sizes={items.node.image.fluid} alt={items.node.id} />
                        <div className="Banner-details">
                            <div>
                                <span className="sub-title">{items.node.subHeading}</span>
                                <h1>{items.node.title}</h1>
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
