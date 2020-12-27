import React from 'react'
import '../css/Information/Information.css'
import Informationinput from '../components/Information/Informationinput'
import Delivery from '../components/Information/Delivery'
import Errors from '../components/Information/Errors'
import {useHistory} from 'react-router-dom'
import {gsap} from 'gsap'
import {SSL_COMRZ} from '../api'
import {connect} from 'react-redux'
import {SAVE_DATA, DELETE_DATA} from '../redux/actions/CartAction'
import {fetchData, dataVerified, findTotalAmount} from '../utils/Helper'
const Information = (props) => {
    const history = useHistory()
    const [selectedDelivery, setSelectedDelivery] = React.useState(0)
    const [errors, setErrors] = React.useState([])
    const fields = [
        { title:'Name*', type: 'text', errorMsg: 'Name and address filed can not be empty' },
        { title:'Email*', type: 'email', errorMsg: 'Email field required and must be valid' },
        { title:'Phone*', type: 'number', errorMsg: 'Phone field required and must be valid with 11 digits' },
        { title:'Address*', type: 'textarea', errorMsg: 'Name and address filed can not be empty'},
    ]
    const deliveryFiled = [
        { name: 'Cash on delivery', onClick: ()=>{}, title:'cash'},
        {name: 'Online Payment (Only sandbox)', onClick: ()=>{},title:'ssl'}
    ]
    const deliveryClickHandler = (index)=> {
       const all = document.getElementsByClassName('inputs')
       for(var i=0;i < all.length;i++)
           all[i].checked = false
       all[index].checked = true
       setSelectedDelivery(index)
    }
    const onSuccessData = (data)=> window.location.href = data.GatewayPageURL
    const onErrorData = (data) => console.log(data)
    const onOrderButtonClick = (e)=>{
        const allOk = dataVerified(fields, setErrors)
        if(allOk && deliveryFiled[selectedDelivery].title === 'cash'){
            props.deleteData()
            gsap.to(e.target, {scale:0, duration: 0.2, ease:'expo.out', onComplete:()=> history.push('/order-complete/done')})
        }else if(allOk && deliveryFiled[selectedDelivery].title === 'ssl'){
            const data = {total: findTotalAmount(props.cartData)}
            fetchData(SSL_COMRZ,onSuccessData,onErrorData,'POST', JSON.stringify(data))
        }
    }
    React.useEffect(()=>{
        (function (window, document) {
            var loader = function () {
                var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
                script.src = "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7);
                tag.parentNode.insertBefore(script, tag);
            };
        
            window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
        })(window, document);
    },[])
    React.useEffect(()=>{
        if(props.cartData.length === 0)
            history.replace('/browse')
    },[])
    return (
        <div id='information-container'>
            <p id='information-title'>Your Information</p>
            <Errors errors = {errors}/>
            {fields.map((f,index)=>(
                <Informationinput data = {f} key={index}/>
            ))}
            {deliveryFiled.map((d,index)=>(
                <Delivery key = {index} data = {d} checked = {index === selectedDelivery ? true : false} onClick={()=>deliveryClickHandler(index)}/>
            ))}
            <button id='information-order-button' onClick={onOrderButtonClick}>Order({'$'+findTotalAmount(props.cartData)})</button>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return {
        cartData : state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveData : (data)=> dispatch({type:SAVE_DATA,data: data }),
        deleteData : ()=> dispatch({type:DELETE_DATA })
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Information)