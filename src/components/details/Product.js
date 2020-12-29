import React from 'react'
import Addtocart from './Addtocart'
import '../../css/details/Product.css'
const Product = (props) => {
    const findProductCount = (data, cartData) => {
        console.log(data)
        if(!isEmpty(data)){
            const findIndex = cartData.findIndex((d)=> d.id === data.product_id && d.color === data.colors[selectedIndex])
            return findIndex === -1 ? -1 : cartData[findIndex].count
        }else
            return -1
    }
    const isEmpty = (obj) => {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) 
            return false;
        }
        return true
    }
    const findTotalItem = data =>{
        let total = 0
        data.forEach((d)=>{
            total += d.count
        })
        return total
    } 
    const onPlusPressed = () => {
        if(productCount !== 5 && findTotalItem(props.cartData) !== 5){
            const obj = {
                id: props.data.id,
                color: props.data.colors[selectedIndex],
                title: props.data.title,
                count: productCount + 1,
                image: props.data.image,
                price: props.data.price
            }
            props.saveData(obj)
            setProductCount(productCount + 1)
        }
    }
    const onMinusPressed = () => {
        if(productCount > 0 ){
            const obj = {
                id: props.data.id,
                color: props.data.colors[selectedIndex],
                title: props.data.title,
                count: productCount - 1,
                image: props.data.image,
                price: props.data.price
            }
            props.saveData(obj)
            setProductCount(productCount - 1)
        }
    }
    const [selectedIndex, setIndex] = React.useState(0)
    const [productCount, setProductCount] = React.useState(0)
    React.useEffect(()=>{
        const x = findProductCount(props.data,props.cartData)
        setProductCount( x === -1 ? 0 : x)
    },[selectedIndex])
    return (
        !isEmpty(props.data) ? (
            <div id='product-detail-container'>
                <img src={props.data.image} alt={'productimage'}/>
                <div id='product-detail-info'>
                    <p className='product-detail-title info'>{props.data.title}</p>
                    <p className='product-detail-other info'>{props.data.country}</p>
                    <p className='product-detail-other info'>{'$'+props.data.price}</p>
                    {props.data.colors.map((d,index)=>(
                        selectedIndex === index ? 
                            <button className='color-button selected-button info' key={index} onClick={()=>setIndex(index)}>{d}</button>
                            : <button className='color-button info' key={index} onClick={()=>setIndex(index)}>{d}</button>
                    ))}
                    <Addtocart productCount = {productCount} onPlusPressed = {onPlusPressed} onMinusPressed = {onMinusPressed}/>
                </div>
            </div>
        ) : <div id='product-detail-container'>Nothing found</div>
    )
}
export default Product