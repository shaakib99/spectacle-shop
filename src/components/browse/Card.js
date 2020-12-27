import gsap from 'gsap/gsap-core'
import React from 'react'
import {useHistory} from 'react-router-dom'
import '../../css/browse/Card.css'
const Card = (props) => {
    const link = 'product/'+props.cardData.product_id
    const history = useHistory()
    const handleOnClick = () => {
        gsap.to('.card-container',{ scale:0, duration:0.1, ease:'expo.out', onComplete:()=> history.replace(link,false) })
    }
    React.useEffect(()=>{
        gsap.to('.card-container',{ scale:1, duration:0.1, ease:'expo.out' })
    },[props.cardData])
    return (
        <div className='card-container' onClick={handleOnClick}>
            <img src={props.cardData.image} alt={'card-img'} className='product-img'/>
            <div className='card-info'>
                <p className='card-product-title'>{props.cardData.title}</p>
                <p className='card-product-other'>{props.cardData.colors}</p>
                <p className='card-product-other'>{props.cardData.country}</p>
                <p className='card-product-other'>{'$ '+props.cardData.price}</p>
            </div>
        </div>
    )
}
export default Card