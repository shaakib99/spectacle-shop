import React from 'react'
import '../css/ordercomplete/Ordercomplete.css'
import orderCompleteLogo from '../assets/images/order-complete.svg'
import {gsap} from 'gsap'
import {useHistory, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {DELETE_DATA} from '../redux/actions/CartAction'
import {GET_TRAN_DETAIL} from '../api'
import Loader from '../components/Loader'
import {fetchData} from '../utils/Helper'

const Ordercomplete = (props)=>{
    const { tranid } = useParams()
    const history = useHistory()
    const imageref = React.createRef()
    const [isLoading, setLoading] = React.useState(true)
    const [paymentDone, setPaymentDone] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const allMessages = {
        validMessage: '',
        processingMessage: 'Your payment status is processing...',
        invalidMessage: 'Invalid Payment ID',
        failedMessage: 'Your payment status- FAILED',
        couldNotCompleteRequest: 'Could not complete request',
    }
    const handleOnClick = (e)=>{
        gsap.to(e.target,{scale:0, duration:0.2, ease:'expo.out', onComplete:()=>history.push('/browse')})
    }
    const setState =(message, paymentStatus, loadingStatus) => {
        setMsg(message)
        setPaymentDone(paymentStatus)
        setLoading(false)
    }
    const onSuccess = (data) => {
        if(data.APIConnect === 'DONE'){
            if(data.no_of_trans_found > 0){
                const status = data.element[data.no_of_trans_found - 1].status
                if(status === "VALIDATED" || status === "VALID" )
                {
                    setState(allMessages.validMessage,true)
                    props.deleteData()
                }else if(status === "PROCESSING" || status === "PENDING"){
                    setState(allMessages.processingMessage,false)
                }else{
                    setState(allMessages.failedMessage, false )
                }
            }else{
                setState(allMessages.invalidMessage, false )
            }
        }
        else{
            setState(allMessages.couldNotCompleteRequest, false)
        }
    }
    const onError = (data) => console.log(data)
    React.useEffect(()=>{
        setPaymentDone(false)
        setLoading(true)
        if(tranid !== 'done'){
            const url = GET_TRAN_DETAIL + tranid
            fetchData(url,onSuccess,onError,'GET',null)
        }else{
            props.deleteData()
            setState(allMessages.validMessage, true)
        }
    },[])
    return (
        <div id='order-complete-container'>
            {isLoading ? <Loader />: null}
            {!isLoading && !paymentDone ? (<p>{msg}</p>) : null}
            {!isLoading && paymentDone ? (
                <div id='order-complete-main-container'>
                <img src={orderCompleteLogo} alt={'order-complete'} ref={imageref}/>
                <p>Thank you for your order</p>
                <button onClick={handleOnClick}>Browse other</button>
                </div>
            ) : null}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteData : ()=> dispatch({type: DELETE_DATA}),
    }
}
export default connect(null,mapDispatchToProps) (Ordercomplete)