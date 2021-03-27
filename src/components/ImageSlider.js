import React from 'react'
import {Carousel,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../Images/Image1.jpg'
import img2 from '../Images/Image2.jpg'
import img3 from '../Images/Image3.jpg'


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
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    <Button variant="dark">Dark</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className='shiftImage'
                    //  height='500px' width='1000px'
                    src={img2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <Button variant="dark">Dark</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className='shiftImage'
                    //   height='500px' width='1000px'
                    src={img3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    <Button variant="dark">Dark</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider

