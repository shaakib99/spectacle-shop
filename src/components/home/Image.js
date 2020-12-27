import React from 'react'
import '../../css/home/Image.css'
import headImage from '../../assets/images/amico.svg'
const Image = (props) => {
    return (
        <div id='home-image-container'>
            <img src={headImage} alt='homeimage' id='home-image'/>
        </div>
    )
}
export default Image