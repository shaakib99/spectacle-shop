import React from 'react'
import '../../css/details/Addtocart.css'
const Addtocart = ({productCount,onPlusPressed,onMinusPressed}) => {
    return (
        <div id='add-to-cart-container'>
            <span>Add to cart</span>
            <div id='cart-input'>
                <span onClick={onMinusPressed}>-</span>
                <input type='text' value={productCount} />
                <span onClick={onPlusPressed}>+</span>
            </div>
        </div>
    )
}
export default Addtocart