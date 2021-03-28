import React from 'react'
import ImageSlider from './ImageSlider'
import img1 from '../Images/ImageO1.jpeg'
import {Image} from 'react-bootstrap'

function Home() {
    return (
        <div className='rem-bg'>
            <ImageSlider/>
            <Image src={img1} className='howTo-img' />
        </div>
    )
}

export default Home
