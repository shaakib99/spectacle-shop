export const fetchData = (url,onSuccessCallBack, onFailedCallBack, method, body) => {
    fetch(url,{method:method, body:body,headers:{'Accept': 'application/json','Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(
            success => onSuccessCallBack(success),
            error => onFailedCallBack(error)
        )
}
export const dataVerified = (fields, setErrors) => {
    let isallOk = true
    let err = []
    fields.forEach(f => {
        if(f.title === 'Name*' || f.title === 'Address*'){
            const item = document.getElementById(f.title)
            if(item.value === ''){
                isallOk = false
                item.parentNode.style.borderColor = 'red'
                item.parentNode.style.boxShadow = '1px 1px 10px 1px rgb(248, 150, 150)'
                // setErrors([...errors,,f.errorMsg])
                err.push(f.errorMsg)
            }else{
                item.parentNode.style.borderColor = '#838282'
                item.parentNode.style.boxShadow = 'none'
            }
        }
        else if(f.title === 'Email*'){
            const item = document.getElementById(f.title)
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(!re.test(String(item.value).toLowerCase())){
                isallOk = false
                item.parentNode.style.borderColor = 'red'
                item.parentNode.style.boxShadow = '1px 1px 10px 1px rgb(248, 150, 150)'
                // setErrors([...errors,f.errorMsg])
                err.push(f.errorMsg)
            }else{
                item.parentNode.style.borderColor = '#838282'
                item.parentNode.style.boxShadow = 'none'
            }
        }
        else if(f.title === 'Phone*'){
            const re = /^\d{11}$/;
            const item = document.getElementById(f.title)
            if(!re.test(item.value)){
                isallOk = false
                err.push(f.errorMsg)
                item.parentNode.style.borderColor = 'red'
                item.parentNode.style.boxShadow = '1px 1px 10px 1px rgb(248, 150, 150)'
                // setErrors([...errors,f.errorMsg])
            }else{
                item.parentNode.style.borderColor = '#838282'
                item.parentNode.style.boxShadow = 'none'
            }
        }
    });
    setErrors(err)
    return isallOk
}
export const findTotalAmount = (data) => {
    let total = 0
    data.forEach((d)=>{
        total += d.count * d.price
    })
    return total
}
export const findTotal = (data)=>{
    let total  = 0
    data.forEach((d)=>{
        total += d.count
    })
    return total
}