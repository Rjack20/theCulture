import React,{useContext, useCallback,useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AuthContext} from '../../Auth'
import  app  from '../../base';
import './style.css'


 function AppBar(props) {
     
    var [currentUser, setUser] = useState('')
    var [profileImage, setProfileImage]= useState('')

    const signout =  useCallback( async =>{
        try {
         app
            .auth()
            .signOut()
            props.history.push('/');
        } catch (error) {
            alert(error)
        }
    }, [props.history]);

    const submitSearch = (e)=>{
        e.preventDefault()
        alert('Searched')
    }

    const handleClick =()=>{
        props.history.push('/user/' + currentUser)
         window.location.reload()
    }
   useEffect(() => {
       app.auth().onAuthStateChanged((user)=>{
           if(user){
               setUser(user.uid)
            var userRef = app.database().ref('Users')
            userRef.child(user.uid).on('value', snap=>{
                if(snap.exists()){
                    setProfileImage(profileImage = snap.val().profileImage)
                }
            })
           }
       })
    
       return () => {
          
       }
   }, [])



        return (
  
            <div  id='appbar_container'>
                
               <ul className='navbarMenu'>

                   {currentUser ? (<li onClick={()=>handleClick()}><img src={profileImage} alt='go to user profile'/></li>):(null)}
                   {currentUser ? ( <li> <Link className='link' to='/'>Home</Link></li>):(null)}
                    <li> <Link className='link' to='/news'>News</Link></li>
                    <li><Link className='link' to='/chart100'>Chart100</Link></li>
                    <li><Link className='link' to='/notifications'>Notifications<span>1</span></Link></li>
                    {currentUser ? (<li> <Link className='link-sign' to='/signin' onClick={signout}><p>Signout</p></Link></li>) : ( <li> <Link className='link-sign' to='/signin'>Signin</Link></li>)}
                    
                </ul>
                   
            </div>
         
            )
    
}
export default withRouter(AppBar);
