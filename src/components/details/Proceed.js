import React from 'react'
import '../../css/details/Proceed.css'
import {gsap} from 'gsap'
import {useHistory} from 'react-router-dom'
const Proceed = (props) => {
    const history = useHistory()
    const onClickHandler = () => {
        gsap.to('#proceed-button-container',{scale:0, duration:0.2,ease:'expo.out',onComplete:()=>history.push('/spectacle-shop/information')})
    }
    return (
        <button id='proceed-button-container' onClick={onClickHandler}>{'Proceed ($'+props.total+')'}</button>
    )
}
export default Proceed