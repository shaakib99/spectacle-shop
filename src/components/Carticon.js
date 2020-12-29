import React from 'react'
import Cartlayout from '../components/Cartlayout'
import '../css/Carticon.css'
import CartImg from '../assets/images/cart.svg'
import {findTotalAmount,findTotal} from '../utils/Helper'

const Carticon = (props) => {
    const [showLayout, setLayout] = React.useState(false)
    const [total,setTotal] =  React.useState(findTotal(props.data))
    const [totalAmount, setTotalAmount] = React.useState(findTotalAmount(props.data))
    const onclickHandler = () => {
        setLayout(showLayout ? false : true)
    }
    React.useEffect(()=>{
        setTotal(findTotal(props.data))
        setTotalAmount(findTotalAmount(props.data))
    },[props])
    return (
        <div id="cart-icon-container">
            <img src={CartImg} alt={'cart-icon'} onClick = {onclickHandler}/>
            <span style={{display: showLayout ? 'none' : 'flex'}}>{total}</span>
            <Cartlayout total = {totalAmount} display = {showLayout} data = {props.data} saveData = {props.saveData}/>
        </div>
    )
}
export default Carticon