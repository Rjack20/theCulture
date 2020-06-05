import React,{Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import News from './components/News'
import Chart100 from './components/Chart100'
import Signin from './components/Signin'
import { AuthProvider } from './Auth';
import Header from './components/Header';
import BottomSection from './components/BottomSection';
import ContentLoader from './components/ContentLoader';
import BlogDetails from './components/BlogDetails';
import UserProfile from './components/UserProfile'
import Setup from './components/Setup'
import Home from './components/Home'
import Post from './components/Post'
import app from './base';
import LikesPopup from './components/LikesPopup';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import EditProfile from './components/EditProfile';
import Notifications from './components/Notifications';


const theme = createMuiTheme({
  
 
});



class App extends Component {
  constructor(props){
    super(props)

    this.state={
      athenticated: false,
      currentUserId: null
    }
  }

componentWillMount(){
  this.removeAuthListener = app.auth().onAuthStateChanged((user)=>{
    if(user){
      this.setState({
        athenticated: true,
      })
    }else{
      this.setState({
        athenticated: false
      })
    }
  })
}

componentWillUnmount(){
  this.removeAuthListener()
}


  render(){

 
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
    <BrowserRouter>
     <Header authenticated={this.state.athenticated}/>
    <Switch>

      <Route path="/" exact><Home authenticated={this.state.athenticated}/></Route>
      <Route path="/news" exact component={News}/>
      <Route path="/chart100" exact component={Chart100}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/setup" exact component={Setup}/>
      <Route path="/notifications" exact component={Notifications}/>
      <Route path="/likes" exact component={LikesPopup}/>
      <Route path="/contentloader" exact component={ContentLoader}/>
      <Route path="/article/:id" exact component={BlogDetails}/>
      <Route path="/user/:id" exact component={UserProfile}/>
      <Route path="/post/:userId/:postId" exact component={Post}/>
      <Route path="/edit/:userId" exact component={EditProfile}/>
      </Switch>
      <BottomSection/>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    
  );
  }
}

export default App;
