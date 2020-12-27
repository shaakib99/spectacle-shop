import React from 'react';
import '../css/home/home.css'
import Heading from '../components/home/Heading'
import Image from '../components/home/Image'
const Home = (props) => {
    return (
        <div id='home-container'>
            <div id='home-left'>
                <Heading />
            </div>
            <div id='home-right'>
                <Image />
            </div>
        </div>
    )
}
export default Home