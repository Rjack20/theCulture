import React from 'react'
import './style.css'
import {Link} from 'react-router-dom' 

export default function RecentPost(props) {

    
    return (
        <div id='recentContainer'>
            <Link id='feature-link' to={'/' + props.id}>
            <h1>{props.title}</h1>
            <span>{props.time}</span>
            <img src={props.coverImage} alt='' />
            </Link>
        </div>
    )
}
