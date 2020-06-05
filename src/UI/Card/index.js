import React from 'react'
import './styles.css'

export default function Card(props) {
    return (
        <div className='card' {...props}>
            {props.children}
        </div>
    )
}
