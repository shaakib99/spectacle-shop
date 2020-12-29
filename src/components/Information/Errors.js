import React from 'react'
import '../../css/Information/Errors.css'
const Errors = (props) => {
    return (
        props.errors.length > 0 ? (
            <ul id='errors-container'>
                {props.errors.map((e,index)=>(
                    <li key={index}>{'- '+e}</li>
                ))}
            </ul>
        ) : null
    )
}
export default Errors