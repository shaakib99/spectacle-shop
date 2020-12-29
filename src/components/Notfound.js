import React from 'react'
import '../css/Notfound.css'
import notfound from '../assets/images/notfound.svg'
const Notfound = (props) => {
    return (
        <div id='not-found-container'>
            <img src={notfound} alt={'Nothing found'}/>
            <br/>
            <span>Nothing to browse...</span>
        </div>
    )
}
export default Notfound