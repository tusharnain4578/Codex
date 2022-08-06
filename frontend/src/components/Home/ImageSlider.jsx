import React from 'react'
import sliderImg1 from '../images/slider-img1.jpg'
import sliderImg2 from '../images/slider-img2.jpg'
import sliderImg3 from '../images/slider-img3.png'

const Carousel = () => {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={sliderImg1} className="d-block w-100" alt="silder-img1" />
                        <div className="carousel-caption d-none d-md-block " style={{ background: "rgba(0,0,0,0.5)" }}>
                            <h5 className='h1'>Multiple Programming Language Support</h5>
                            <p className='h4'>Including C, C++, Java, Python, Javascript, etc.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImg2} className="d-block w-100" alt="silder-img2" />
                        <div className="carousel-caption d-none d-md-block " style={{ background: "rgba(0,0,0,0.5)" }}>
                            <h5 className='h1'>Multiple Programming Language Support</h5>
                            <p className='h4'>Including C, C++, Java, Python, Javascript, etc.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImg3} className="d-block w-100" alt="silder-img3" />
                        <div className="carousel-caption d-none d-md-block " style={{ background: "rgba(0,0,0,0.5)" }}>
                            <h5 className='h1'>Multiple Programming Language Support</h5>
                            <p className='h4'>Including C, C++, Java, Python, Javascript, etc.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel