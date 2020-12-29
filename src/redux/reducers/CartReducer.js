import {SAVE_DATA, DELETE_DATA} from '../actions/CartAction'
const x = localStorage.getItem('cartData')
const cartState = x === null ? [] : JSON.parse(x)
const saveData = (state, data) => {
    const index = state.findIndex((d)=> d.id === data.id && d.color === data.color)
    if(index === - 1)
        return [...state, data]
    else{
        state[index] = data
        if(state[index].count === 0 ){
            let tmpState = []
            state.forEach((s,i)=>{
                if(i !== index)
                    tmpState.push(s)
            })
            state = tmpState
        }
        return state
    }
}
const CartReducer = (state = cartState, action) => {
    switch(action.type){
        case SAVE_DATA:
            const x = saveData(state, action.data)
            state = x
            state = [...state]
            localStorage.setItem('cartData', JSON.stringify(state))
            return state
        case DELETE_DATA:
            state = []
            localStorage.setItem('cartData',JSON.stringify(state))
            return state
        default:
            return state
    }
}
export default CartReducer