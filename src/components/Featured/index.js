import React from 'react'
import './style.css'
import nikki from '../../assets/nikki.jpg'
import Card from '../../UI/Card'
import { Link } from 'react-router-dom'

export default function Featured(props) {


    
    const handleRemoveBlog=(id)=>{
            
        props.removeBlog(id)
        
      }
      

    
    return (
        
        <div id='feature-container' >
            <div id='feature-close-btn'>
                <img onClick={()=>{
                    handleRemoveBlog(props.id)
                }} src={require('../../assets/close_icon.png')} alt=''/>
            </div>
            <Link id='feature-link' to={'/article/' + props.id}>
            <div id='featuredContainer'>
                <h1>{props.title}</h1>
                <div id='featureSub'>
                        <p>{props.sub}</p>
                    </div>
                <span>{props.time}</span>
                    <div id='featureImage'>
                        <img src={props.coverImage} alt=''/>
                    </div>
        
            </div> 
            </Link> 
        </div>
       
    )
}
