import React from 'react'
import './Home.css'
import Footer from './Footer'
import ImageSlider from './Home/ImageSlider'
import AboutUs from './Home/AboutUs'
import Features from './Home/Features'
import Faq from './Home/Faq'

const Home = () => {
    return (
        <>
            <ImageSlider />
            <AboutUs />
            <Features />
            <Faq />
            <Footer />
        </>
    )
}

export default Home