import React from 'react'
import './style.css'
import {Link} from 'react-router-dom' 


export default function TrendingArtist(props) {

    const handleRemoveBlog=(id)=>{
            
        props.removeBlog(id)
        
      }

    return (
        <div id='trendArtistContainer'>
         <Link id='feature-link' to={'/' + props.id}>
            <div>
            <div id='feature-close-btn'>
                <img onClick={()=>{
                    handleRemoveBlog(props.id)
                }} src={require('../../assets/close_icon.png')} alt=''/>
            </div>
            
                <span>{props.artist}</span>
                <p>{props.city}</p>
                <p>{props.rank}</p>
            </div>
            <div id='trendingArtistImage'>
                <img src={props.coverImage}/>
            </div>
         </Link>
        </div>
    )
}
