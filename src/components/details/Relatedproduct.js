import React from 'react'
import '../../css/details/Relatedproduct.css'
import Card from '../browse/Card'
import Notfound from '../Notfound'
import {gsap} from 'gsap'
const Relatedproduct = (props)=>{
    React.useEffect(()=>{
        gsap.to('.card-container',{ opacity:1, ease:'expo.out', duration:0.2, stagger:0.2 })
    })
    return (
        <div id='related-product-container'>
            <div id='related-product-title-container'>
            <p id='related-product-title'>Related Product</p>
            <div id='related-product-hr'></div>
            </div>
            <div className='related-product-card'>
                {props.relatedproduct.length > 0 ? (
                    props.relatedproduct.map((p,index)=>(
                        <Card cardData = {p} key={index}/>
                    ))
                ) : <Notfound />}
            </div>
        </div>
    )
}
export default Relatedproduct