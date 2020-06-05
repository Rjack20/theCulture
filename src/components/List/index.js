import React from 'react'
import './style.css'
import nikki from '../../assets/nikki.jpg'
import Card from '../../UI/Card'
import { Link } from 'react-router-dom'

export default function List(props) {

    const handleRemoveBlog=(id)=>{
            
        props.removeBlog(id)
        
      }
      

    return (
        <div>
        <div id='list-container' >
            <div id='list-close-btn'>
                <img onClick={()=>{
                    handleRemoveBlog(props.id)
                }} src={require('../../assets/close_icon.png')} alt=''/>
            </div>
            <Link id='list-link' to={'/' + props.id}>
            <div id='listContainer'>
                <h1>{props.title}</h1>
                <div id='listSub'>
                        <p>{props.sub}</p>
                    </div>
                <span>{props.time}</span>
                    <div id='listImage'>
                        <img src={props.coverImage} alt=''/>
                    </div>
        
            </div> 
            </Link> 
        </div>
        </div>
    )
}
