import React from 'react'
import '../../css/details/Detailcontent.css'
import Product from './Product'
import Carticon from '../Carticon'
import Relatedproduct from './Relatedproduct'
const Detailcontent = (props) => {
    return (
        <div id='detail-content-container'>
            <div id='detail-content-upper'> {<Product data = {props.data} cartData = {props.cartData} saveData = {props.saveData}/>} </div>
            <div id='detail-content-lower'><Relatedproduct relatedproduct ={props.relatedProduct}/></div>
            {props.cartData.length > 0 ? <Carticon data = {props.cartData} saveData = {props.saveData} /> : null}
        </div>
    )
}
export default Detailcontent