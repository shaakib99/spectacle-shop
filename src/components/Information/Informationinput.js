import React from 'react'
import '../../css/Information/Informationinput.css'
import {gsap} from 'gsap'
const Informationinput = (props) => {
    const title = React.createRef()
    const input = React.createRef()
    const focusHandler = (e) => {
        gsap.to(title.current,{y:'-1.5rem',duration:0.2, ease:'expo.out'})
    }
    const blurHandler = (e)=>{
        if(input.current.value === '')
            gsap.to(title.current, {y:0,duration:0.2,ease:'expo.out'}) 
    }
    return (
        <div className='information-input-container' onFocus={focusHandler} onBlur = {blurHandler}>
            <p ref={title}>{props.data.title}</p>
            <input type={props.data.type} ref = {input} id={props.data.title}/>
        </div>
    )
}
export default Informationinput