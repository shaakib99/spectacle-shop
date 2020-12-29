import React from 'react'
import '../css/Cartlayout.css'
import deleteIcon from '../assets/images/delete.svg'
import Proceed from '../components/details/Proceed'
import {gsap} from 'gsap'
const Cartlayout = (props) => {
    const deleteData = (data) => {
        data.count = 0
        props.saveData(data)
    }
    const handleOnClick = (index,data)=>{
        const all = document.getElementsByClassName('cart-items-container')
        gsap.to(all[index],{x:'-200%',opacity:0,backgroundColor:'rgb(231, 66, 66)', duration:0.2,ease:'expo.out',onComplete:()=>{
            deleteData(data)
            if(index !== all.length){
                all[index].style.transform = 'translate(0)'
                all[index].style.opacity = 1
                all[index].style.backgroundColor = 'white'
            }
        }})
    }
    return (
        <div id='cart-layout-container' style={{display: props.display ? 'flex' : 'none'}}>
            {props.data.length > 0 ?  (
                props.data.map((d,index)=>(
                    <div className='cart-items-container' key={index}>
                        <img src={d.image} alt='producimage'/>
                        <p>{d.title}</p>
                        <p>{'-'+ d.color}</p>
                        <p>{'x'+d.count}</p>
                        <p>{'$'+d.count * d.price}</p>
                        <img src={deleteIcon} alt='delete-icon' className='delete-icon' onClick={()=>handleOnClick(index,d)}/>
                    </div>
                ))
            ) : null}
            {props.data.length > 0 ? <Proceed total={props.total}/> : null}
        </div>
    )
}
export default Cartlayout