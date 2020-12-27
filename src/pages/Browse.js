import React from 'react'
import {gsap} from 'gsap'
import Loader from '../components/Loader'
import Content from '../components/browse/Content'
import '../css/browse/Browse.css'
import {connect} from 'react-redux'
import {SAVE_DATA} from '../redux/actions/CartAction'
import {GET_LIST} from '../api'
import {fetchData} from '../utils/Helper'
const Browse = (props) => {
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [page, setPage] = React.useState(1)
    const onDataLoad = () => {
        document.getElementById('browse-container').classList.add = 'load-config'
        gsap.to('#loader-container',{scale:2, duration:0.1, ease:'expo.out', onComplete:()=> {
            setLoading(false)
            document.getElementById('browse-container').classList.remove = 'load-config'
            addScrollListener()
        }})
    }
    const onSuccessData = (d)=>{
        let n = []
        data.forEach(dat=>{
            n.push(dat)
        })
        d.forEach(dat=>{
            n.push(dat)
        })
        setData(n)
        if(d.length !== 0)
            onDataLoad()
    }
    const onError = (data)=> console.log(data)
    React.useEffect(()=>{
        console.log(page)
        const url = GET_LIST + page
        fetchData(url,onSuccessData,onError,'GET',null)
    },[page])
    const addScrollListener = ()=>{
        const y = document.getElementById('browse-container')
        const x = document.getElementById('browse-items')
        if(y.offsetHeight > x.offsetHeight){
            setPage(page + 1)
        }else{
            document.getElementById('browse-container').addEventListener('scroll',handleScroll)
        }
    }
    const handleScroll = (e)=> {
        const x = document.getElementById('browse-items')
        const y = document.getElementById('browse-container')
        console.log('after', y.offsetHeight, x.offsetHeight,y.scrollTop)
        if(y.scrollTop + y.offsetHeight >= x.offsetHeight){
            y.removeEventListener('scroll', handleScroll)
            setPage(page + 1)
        }
    }
    return (
        <div id='browse-container'>
            {isLoading ? (<Loader/>) : null}
            {!isLoading ? <Content page = {page} setPage ={setPage} setData = {setData} data = {data} cartData={props.cartData} saveData = {props.saveData}/> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cartData: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveData: (data)=> dispatch({type: SAVE_DATA, data:data})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Browse)