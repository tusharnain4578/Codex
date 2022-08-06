import React from 'react'
import './Features.css'
import featureImg from '../images/features-img.jpg'

const Features = () => {
    return (
        <>
            <div className='features'>
                <div className="row feature-icons w-100" >
                    <h3 className='mt-3' >Ratione mollitia eos ab laudantium rerum beatae quo</h3>

                    <div className="row">

                        <div className="col-xl-4 text-center" >
                            <img src={featureImg} className="img-fluid p-4" alt="" />
                        </div>

                        <div className="col-xl-8 d-flex content">
                            <div className="row align-self-center gy-5">

                                <div className="col-md-6 icon-box" >
                                    <i className="ri-line-chart-line"></i>
                                    <div>
                                        <h4>Corporis voluptates sit</h4>
                                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                                    </div>
                                </div>

                                <div className="col-md-6 icon-box" >
                                    <i className="ri-stack-line"></i>
                                    <div>
                                        <h4>Ullamco laboris nisi</h4>
                                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                                    </div>
                                </div>

                                <div className="col-md-6 icon-box" >
                                    <i className="ri-brush-4-line"></i>
                                    <div>
                                        <h4>Labore consequatur</h4>
                                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                                    </div>
                                </div>

                                <div className="col-md-6 icon-box">
                                    <i className="ri-magic-line"></i>
                                    <div>
                                        <h4>Beatae veritatis</h4>
                                        <p>Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta</p>
                                    </div>
                                </div>

                                <div className="col-md-6 icon-box" >
                                    <i className="ri-command-line"></i>
                                    <div>
                                        <h4>Molestiae dolor</h4>
                                        <p>Et fuga et deserunt et enim. Dolorem architecto ratione tensa raptor marte</p>
                                    </div>
                                </div>

                                <div className="col-md-6 icon-box" >
                                    <i className="ri-radar-line"></i>
                                    <div>
                                        <h4>Explicabo consectetur</h4>
                                        <p>Est autem dicta beatae suscipit. Sint veritatis et sit quasi ab aut inventore</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Features