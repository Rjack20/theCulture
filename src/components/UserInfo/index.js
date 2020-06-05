import React, { Component } from 'react'
import './style.css'
import { withRouter } from 'react-router'
import app from '../../base'



class UserInfo extends Component {
  constructor(props){
    super(props)
    this.checkFollowing = this.checkFollowing.bind(this)
    this.followClick = this.followClick.bind(this)
    this.followRef = app.database().ref('Follow')

    this.state = {
      isFollowing: false,
      currentUid: null
  }
  }



  
 followClick(id){
  var userdId = app.auth().currentUser.uid
  if(!userdId){
      return
   }else{

      if(this.state.isFollowing){
         this.followRef.child(id).child('followers').child(userdId).remove()
         .then(()=>{
          this.followRef.child(userdId).child('following').child(id).remove()
         }).then(()=>{this.setState({isFollowing: false})})
      }else{
          this.followRef.child(id).child('followers').child(userdId).set(true)
          .then(()=>{
              this.followRef.child(userdId).child('following').child(id).set(true)
              .then(()=>{this.setState({isFollowing: true})})
          })
      }
      
   }

}


  checkFollowing(id, currentUid){
    this.followRef.child(id)
    .child('followers')
    .child(currentUid).on('value', snap=>{
        if(snap.exists()){
            this.setState({
                isFollowing: true
            })
        }else{
            this.setState({
                isFollowing: false
            })
        }
    })
    
    }


    componentWillMount(){

      app.auth().onAuthStateChanged((user)=> {
          if(user){
          this.checkFollowing(this.props.id, user.uid)
         this.setState({
             currentUid: user.uid
         })
          }else{
  
          }
  
      });
  
  }
  
    render() {
        return (
            
          <div id='liker'>
          <div onClick={(()=>{
                    this.props.history.push('/user/' + this.props.id)
                })} id='likeUserInfo'>
          {this.props.profileImage ?
          (<img src={this.props.profileImage}/>)
           :
           (<img src={require('../../assets/noimage.png')}/>)}
            <div id='likerInfo'>
                <p>{this.props.userName}</p>
                <p>{this.props.label}</p>
                <p>{this.props.city}</p>
                <p>rank</p>
            </div>
          </div>
            
            {this.props.currentUid === this.props.id ? (<div onClick={()=>{
                    this.followClick(this.props.id)
                }} id='followStatus'>
                {this.state.isFollowing ? (<span>Following</span>):(<span>Follow</span>)}
            </div>):(null)}
          
      </div>
        )
    }
}
export default withRouter(UserInfo)