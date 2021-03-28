import React from 'react'
import {Carousel,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../Images/ImageO2.jpeg'
import img3 from '../Images/ImageO3.jpeg'
import img2 from '../Images/ImageO4.jpeg'
import img4 from '../Images/ImageO5.jpeg'


const ImageSlider = () => {
    return (
        <div>
            
            <Carousel className='shiftCarousel'>
                <Carousel.Item>
                    <img className='shiftImage'  
                    // height='500px' width='1000px'
                    src={img1}
                    alt="First slide"
                    />
                   
                </Carousel.Item>
                <Carousel.Item>
                    <img className='shiftImage'
                    //  height='500px' width='1000px'
                    src={img2}
                    alt="Second slide"
                    />

                    
                </Carousel.Item>
                <Carousel.Item>
                    <img className='shiftImage'
                    //   height='500px' width='1000px'
                    src={img3}
                    alt="Third slide"
                    />

                    
                </Carousel.Item>
                <Carousel.Item>
                    <img className='shiftImage'
                    //   height='500px' width='1000px'
                    src={img4}
                    alt="Four slide"
                    />

                    
                </Carousel.Item>
            </Carousel>
            
            
        </div>
    )
}

export default ImageSlider

