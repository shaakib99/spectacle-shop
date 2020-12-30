import React from 'react'
import {connect} from 'react-redux'
import Loader from '../components/Loader'
import Detailcontent from '../components/details/Detailcontent'
import '../css/details/Details.css'
import {SAVE_DATA} from '../redux/actions/CartAction'
import {useParams} from 'react-router-dom'
import {GET_DETAIL} from '../api'
import {fetchData} from '../utils/Helper'
const Details = (props) => {
    const {productid} = useParams()
    console.log('product id=>',productid)
    const [productInfo, setProductInfo] = React.useState({})
    const [relatedProduct,setRelatedProduct] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const onSuccessData = (data)=>{
        const dataStatus = data[0]
        const productData = data[1]
        const relatedProductData = data[2]
        setProductInfo(productData)
        setRelatedProduct(relatedProductData)
        setLoading(false)
    }
    const onError = (data) => console.log(data)
    React.useEffect(()=>{
        setLoading(true)
        const url = GET_DETAIL + productid
        fetchData(url, onSuccessData,onError,'GET',null)
    },[productid])
    return (
        <div id='details-container'>
            {isLoading ? <Loader /> : null}
            {!isLoading  ? <Detailcontent relatedProduct = {relatedProduct} data = {productInfo} cartData = {props.cartData} saveData = {props.saveData}/>: null }
        </div>
    )
}
const mapStateToProps = (state)=>{
    return {
        cartData: state
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        saveData : (data)=> dispatch({type: SAVE_DATA, data:data }),
    }
}
export default connect(mapStateToProps,mapDispatchtoProps)(Details)