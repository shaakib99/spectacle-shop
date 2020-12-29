import React from 'react'
import {gsap} from 'gsap'
import circle from '../assets/images/circle.svg'
import '../css/Loader.css'
const Loader = () => {
    React.useEffect(()=>{
        gsap.to('#loader-container img',{
            rotate:'360deg',
            repeat: -1,
            duration:1
        })
    })
    return(
        <div id='loader-container'>
            <img src={circle} alt="Loading" />
            <p>Loading</p>
        </div>
    )
}
export default Loader