import React from 'react'
import '../../css/Information/Delivery.css'
const Delivery = (props) => {
    return (
        <div className='delivery-container' onClick={props.onClick}>
            <input type='checkbox' checked = {props.checked} className={'inputs'}/>
            <span>{props.data.name}</span>
        </div>
    )
}
export default Delivery