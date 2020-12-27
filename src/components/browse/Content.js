import React from 'react'
import {gsap} from 'gsap'
import Search from './Search'
import Card from './Card'
import '../../css/browse/Content.css'
import Carticon from '../Carticon'
import {SEARCH_PRODUCT} from '../../api'
import Notfound from '../Notfound'
import {fetchData} from '../../utils/Helper'
const Content = (props) => {
    const [searching, setSearching] = React.useState(false)
    const onSuccess = (data)=>{
        props.setData(data)
        setSearching(false)
    }
    const onFail = (data)=> console.log(data)
    const onSearching = (e) => {
        setSearching(true)
        let searchText = e.target.value
        if(searchText === ''){
            searchText = ' '
        }
        const url = SEARCH_PRODUCT + searchText
        fetchData(url,onSuccess,onFail,'GET',null)
    }
    React.useEffect(()=>{
        setTimeout(()=>{
            gsap.to('.card-container',{ opacity:1, ease:'expo.out', duration:0.2, stagger:0.2 })
        },500)
    },[props.data])
    return (
        <div id='browse-content'>
            <div id='search-place'> <Search onSearching = {onSearching}/> </div>
            {!searching ? (
                 <div id='browse-items'>
                    {props.data.map((d,index)=>(
                        <Card cardData = {d} key={index}/>
                    ))}
                </div>
            ) : <p style={{alignSelf:'center',marginTop:'2rem', color:'#323232'}}>Searching...</p>}
            {!searching && props.data.length === 0 ? (
                <Notfound />
            ) : null}
            {props.cartData.length > 0 ? <Carticon data = {props.cartData} saveData = {props.saveData} /> : null}
        </div>
    )
}
export default Content