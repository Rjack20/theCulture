import React from 'react'
import './style.css';
import Card from '../../UI/Card';
import Logo from '../../Logo';
import AppBar from '../../components/AppBar'



export default function Header(props) {

    
    return (
        <div>
            
            <Card>
                <div style={{padding: '80px 0'}}>
                  <Logo/>
                </div>
               
                <AppBar
                authenticated={props.authenticated}
                />
            </Card>
            
        </div>
    )
}
