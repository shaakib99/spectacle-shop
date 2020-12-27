import React from 'react'
import {gsap} from 'gsap'
import {useHistory} from 'react-router-dom'
import '../../css/home/Heading.css'
import eyeglass from '../../assets/images/eyeglass.svg'
const Heading = (props) => {
    const history = useHistory()
    const specacle = ['S','P','E','C','T','A','C','L','E']
    React.useEffect(()=>{
        // Animation
        //const headingAnim = gsap.to('.heading-anim',{ x: 0, ease:'expo.out', duration:0.5, stagger:0.2 })
        const headingMainAnim = gsap.to('.heading-main',{ x: 0, ease:'expo.out', duration:0.4, stagger:0.2})
        // home-image is the id of right side image on Image component
        const animateImage = gsap.to('#home-image',{ scale:1, duration:0.5, ease:'expo.out'})
        const timeline = gsap.timeline({})
        //timeline.add(headingAnim)
        timeline.add(headingMainAnim)
        timeline.add(animateImage)
    },[])
    const handleButtonClick = () => {
        gsap.to('#browse-button',{scale:0, duration:0.1,ease:'expo.out', onComplete:()=> history.push('spectacle-shop/browse')})

    }
    return (
        <div id="heading-container">
            <p className = 'heading heading-anim'>Care your</p>
            <p className='heading heading-bold heading-anim'>EYES</p>
            <p className = 'heading heading-anim'>With our beautiful</p>
            <div id='heading-main-div'>
                {specacle.map((s,index)=>(
                    index === 0 ? 
                        (<p className='heading-main heading-bold heading heading-main-first-letter' key={index}>{s}</p>) : 
                        (<p className='heading-main heading-bold heading' key={index}>{s}</p>)
                ))}
            </div>
            <br />
            <button id='browse-button' onClick = {handleButtonClick}>
                <img src={eyeglass} alt="glass"/>
                <span>Browse</span>
            </button>
        </div>
    )
}
export default Heading