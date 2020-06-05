import React, { Component } from 'react'
import './style.css'
import app from '../../base'
import { withRouter } from 'react-router'

class SearchedUsers extends Component {
    constructor(props){
        super(props)
        this.followRef = app.database().ref('Follow')
        this.checkFollowing = this.checkFollowing.bind(this)
        this.followClick = this.followClick.bind(this)

        this.state = {
            isFollowing: false
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
componentWillMount(){

    app.auth().onAuthStateChanged((user)=> {
        if(user){
        this.checkFollowing(this.props.id, user.uid)
       
        }else{

        }

    });

}




    
    render() {
        return (
            <div id='searchedUsers'>
                <div onClick={(()=>{
                    this.props.history.push('/user/' + this.props.id)
                })} id='searchUserImgInfo'>
                <img src={this.props.profileImage} alt='user'/>
                <div id='searchUserInfo'>
                    {this.props.userName ? (<span>{this.props.userName}</span>):(<span>userName</span>)}
                    {this.props.label ? (<span>{this.props.label}</span>):(<span>label</span>)}
                    {this.props.city ? (<span>{this.props.city}</span>):(<span>city</span>)}
                    <span>rank</span>
                </div>



                </div>

                <div onClick={()=>{
                    this.followClick(this.props.id)
                }} id='searchUserFollowStatus'>
                {this.state.isFollowing ? (<span>Following</span>):(<span>Follow</span>)}
                </div>
                
            </div>
        )
    }
}
export default  withRouter(SearchedUsers)