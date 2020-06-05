import React from 'react'
import './style.css'

export default function SocialInfo() {
    return (
        <div className='socialContainer'>
            
        <div className='socialImage'>

         <p className='followp'>Follow</p>
        </div>
        
        <div className='socialImage'>

            <img className='socialImage' src={require('../../assets/igicon.png')} alt='Social Media Info'/>
        </div>
        <div className='socialImage'>

            <img className='socialImage' src={require('../../assets/tw.png')} alt='Social Media Info'/>
        </div>
        </div>
    )
}
