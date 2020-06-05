import React, { Component} from 'react'
import '../css/signin.css'
import  app  from '../base';
import {withRouter, Redirect} from 'react-router'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import TabPanelL from './TabPanelL'
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




export default class Signin extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeL = this.handleChangeL.bind(this)
        this.handleCreateAccount = this.handleCreateAccount.bind(this)
        this.handleSignin = this.handleSignin.bind(this)
        this.hasWhiteSpaces = this.hasWhiteSpaces.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.onChange =  this.onChange.bind(this)
        this.usersRef = app.database().ref().child('Users')
        this.currentUser = app.auth().currentUser
        this.noSpaceToast = this.noSpaceToast.bind(this)
        this.stringLengthToast = this.stringLengthToast.bind(this)
        this.emptyInputToast = this.emptyInputToast.bind(this)
        this.noUserToast = this.noUserToast.bind(this)
        
    
        this.state = {
            value: 0,
            valueL: 0,
            city: null,
            state: null,
            cities: null,
            buttonDisabled: true,
            cityDisabled: true,
            name: '',
            userName: '',
            email: '',
            password: '',
            

        }
    }
 

     noSpaceToast(){
         toast("Username can't contain spaces", {
             className: 'custom-toast',
             draggable: true,
             position: toast.POSITION.BOTTOM_CENTER
         })
     }

     noUserToast(){
        toast("No user with those credentials exist, check if email or password are spelled correctly.", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

     emptyInputToast(){
        toast("All inputs must be filled", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

     stringLengthToast(){
        toast("Password must be at least 6 characters", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
      
      
     handleChange = (event, newValue) => {
       
            
        this.setState({
            value: newValue
        })
        
        
      };

       handleChangeL = (event, newValueL) => {
        this.setState({
            valueL: newValueL
        })
        
        
      };



     handleSignin = async (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;

        if(email.value === "" || password.value === ""){
            this.emptyInputToast()
        }else{
            try{
                await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                .then(()=>{
                    this.props.history.push('/');
                })
                .catch((err)=>{
                    this.noUserToast()
                    return
                })
            }catch(error){
                alert(error);
                return
            }
            finally {
            
              }
        }
        
    }



 onChange =(e)=>{
    const value = e.target.value

}



 handleCreateAccount =  (event) => {
      event.preventDefault();
      const {name, username, email, password} = event.target.elements;

      //validate inputs return a boolean
     var whiteSpace =  this.checkInput(username.value)

     if(username.value === "" || name.value === "" || email.value === ""){
        this.emptyInputToast()
        return
     }
     
     if(whiteSpace){
        this.noSpaceToast()
        return
     } 
     if(password.value.length < 6){
         this.stringLengthToast()
         return
     }
     else{
        try{
            app
           .auth()
           .createUserWithEmailAndPassword(email.value, password.value)
           
           .then((res)=>{
             
             this.saveUser(res.user.uid, email.value, name.value, username.value)
             return res
           })
           .catch((error)=>{
             var errorCode = error.code;
             var errorMessage = error.message;
           })
          
         }
 
         finally {
             this.props.history.push('/setup');
             event.target.value = ''
           }
     }
     
     
          
    }

    saveUser(id, email, name, username){
        let user = {}
        user['userId'] = id;
        user['userName'] = username.toLowerCase();
        user['name'] = name;
        user['email'] = email;
        user['city'] = '';
        user['state'] = '';
        user['label'] = '';
        user['rating'] = 0;
        user['rank'] = '';
        user['profileImage'] = '';
  //se empuja el arreglo data en el documento del usuario
      this.usersRef.child(id).set(user);
      
    }

    checkInput(username){
//no spaces
     var hasSpaces =  this.hasWhiteSpaces(username)
     return hasSpaces
    }

         hasWhiteSpaces(string){
        if (string.length == string.replace(" ", "").length) {
            return false
        }else{
            return true
        }
        
    }

    
 render(){
    return (

      <div id='signinCreate'>     <>
               <ToastContainer/>
                </>
        
        <div id='someContainer'>
            <div id='firstChild'>
            <Tabs value={this.state.valueL} onChange={this.handleChangeL} aria-label="simple tabs example">
                        <Tab label={<span style={{ color: 'black' }}>Signin</span>}/>
                        <Tab label={<span style={{ color: 'black' }}>Create Account</span>}/> />
            </Tabs>
               
                    <TabPanelL value={this.state.valueL} index={0}>
                    <div id='signin_container'>
                    
                     <h5 id='header_signin'></h5>
                   
                     <form onSubmit={this.handleSignin}>
                        
                        <TextField id='input' type='text' name='email' onChange={this.onChange} helperText="Email" variant="standard" />
                        <br/>
                        
                        <TextField id='input' type='text' name='password' onChange={this.onChange} helperText="Password" variant="standard" />
                        <br/>
                        <Button variant="contained" color="primary" id='signinBtn' type='submit'>Signin</Button>
                      </form>
                   </div>
                    </TabPanelL>
                    <TabPanelL value={this.state.valueL} index={1}>
                    <div id='signin_container'>
                    
                    <h5 id='header_signin'></h5>
                  
                    <form onSubmit={this.handleCreateAccount}>
                       <TextField id='input1' type='text' name='name' maxLength={17}  onChange={this.onChange} helperText="Name" variant="standard" />
                       <br/>
                       <TextField id='input' type='text' name='username' maxLength={17}   onChange={this.onChange} helperText="Username" variant="standard" />
            
                       <br/>
                       
                       <TextField id='input' type='email' name='email'    onChange={this.onChange} helperText="Email" variant="standard" />

                       <br/>
                      
                       <TextField id='input' type='password' name='password'  onChange={this.onChange} helperText="Password" variant="standard" />

                       <br/>
                       <Button variant="contained" color="primary" id='createBtn' type='submit'>Create Account</Button>
                     </form>
                  </div>
                    </TabPanelL>
                    
            </div>


            <div id='secondChild'>
             <div id='tabsContainer'>
                
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label={<span style={{ color: 'white' }}>Discover</span>}/>
                        <Tab label={<span style={{ color: 'white' }}>Connect</span>}/> />
                        <Tab label={<span style={{ color: 'white' }}>Latest News</span>}/> />
                    </Tabs>
               
                    <TabPanel value={this.state.value} index={0}>
                        <div>
                        <h1>Item One</h1>
                        </div>
                   
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <div>
                        <h1>Item Two</h1>
                        </div>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <div>
                        <h1>Item Three</h1>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </div>
        
    </div>
    )
  }
}
