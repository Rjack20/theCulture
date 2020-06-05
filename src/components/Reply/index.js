import React, { Component } from 'react'
import './style.css'
import LikesPopup from '../LikesPopup'
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import app from '../../base'
import { withRouter } from 'react-router'
import moment from 'moment'

class Reply extends Component {
    constructor(props){
        super(props)
        this.handleRemoveReply = this.handleRemoveReply.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.emptyReply = this.emptyReply.bind(this)
        this.getTimePassed = this.getTimePassed.bind(this)
        this.checkIsLiked = this.checkIsLiked.bind(this)
        this.openLikes = this.openLikes.bind(this)
        this.closeLikes = this.closeLikes.bind(this)
        this.replyDeleted = this.replyDeleted.bind(this)
        this.getLikeCount = this.getLikeCount.bind(this)
        this.likes = this.likes.bind(this)
        this.likePost = this.likePost.bind(this)
        this.currentUser = app.auth().currentUser.uid
        this.likeRef = app.database().ref('Likes')
        this.replyRef = app.database().ref('Reply')

        this.state ={
            isLiked: false,
            likeCount: null,
            currentSingedUser: null,
            timePassed:'',
            timePosted: '',
            open: false,
            showReply: false,
            body: ''
        }
    }



    openLikes(){
      this.setState({
         open: true
      })
     }

  closeLikes(){
      this.setState({
         open: false
      })
   }
     

 //reply time
   getTimePassed(){
      this.replyRef.child(this.props.commentId)
      .child('replies')
      .child(this.props.id)
      .on('value', snap=>{
         if(snap.exists()){
           
            setInterval(()=>{
              
               this.setState({
                  timePassed:  moment(snap.val().timePosted).startOf('minute').fromNow()
               }) 
               }, 1000)
         }
      })
   }


    replyDeleted(){
        toast("Reply deleted!", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }




    handleRemoveReply(commentId, id){

            var uid = app.auth().currentUser.uid
         if(!uid){
         
          return
         }else{
             
          this.replyRef.child(commentId).child('replies').child(id).remove()
          .then(()=>{
              this.replyDeleted()
          })
         }
        
        
     }


    likePost(id){
        var userdId = app.auth().currentUser.uid
        if(!userdId){
           return
        }else{
  
           if(this.state.isLiked){
              this.likeRef.child(id).child(userdId).remove()
           }else{
              this.likeRef.child(id).child(userdId).set(true)
           }
           
        }
     }


    getLikeCount(id){
        this.likeRef.child(id).on('value', snap=>{
           if(snap.exists()){
              this.setState({
                 likeCount: snap.numChildren()
              })
           }
        })
     }

    checkIsLiked(id){
        var userdId = app.auth().currentUser.uid
        if(!userdId){
           return
        }else{
           this.likeRef.child(id).child(userdId).on('value', snap=>{
              if(snap.exists()){
                 this.setState({
                    isLiked: true
                 })
              }else{
                 this.setState({
                    isLiked: false
                 })
              }
           })
        }
       
     }

    likes(){
        if(this.state.likeCount === 1){
           return(
             <span  onClick={()=>{
               this.openLikes()
            }}>{this.state.likeCount} Like</span>
           )
        }
        if(this.state.likeCount < 1){
          return(
             null
           )
        }else{
          return(
    
             <span  onClick={()=>{
               this.openLikes()
            }}>{this.state.likeCount} Likes</span>
           )
        }
     }

     handleChange(e){
        this.setState({
            body: e.target.value
        })
    
     }
     emptyReply(){
        toast("Reply body is empty!", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    componentDidMount(){
       app.auth().onAuthStateChanged((user)=>{
          if(user){
            this.setState({
               currentSingedUser: user.uid
            })
          }
       })
        if(!this.props.id){
           return
        }else{
         this.getTimePassed()
          this.checkIsLiked(this.props.id)
         this.getLikeCount(this.props.id)
        }
         
     }
    

    render() {
        var likeCount = this.likes()
        return (
            <div id='reply'>
               <LikesPopup
               id={this.props.id}
               open={this.state.open}
               close={this.closeLikes}
               />
                 <>
                <ToastContainer/>
                 </>
                    <div id='commentInfo'>
                  {this.props.profileImage ? 
                  (<img onClick={()=>{
                     this.props.history.push('/user/' + this.props.userId )
                  }}  src={this.props.profileImage}/>)
                   :
                   (<img onClick={()=>{
                     this.props.history.push('/user/' + this.props.userId )
                  }} src={require('../../assets/noimage.png')}/>)}
                  <div onClick={()=>{
                     this.props.history.push('/user/' + this.props.userId )
                  }} id='commentInfoText'>
                      {this.props.userName ? (<span>{this.props.userName}</span>):(<span>userName</span>)}
                      {this.props.label ? (<span>{this.props.label}</span>):(<span>label</span>)}
                      {this.props.city ? (<span>{this.props.city}</span>):(<span>city</span>)}
                      <span>rank</span>
                  </div>

                  <div id='commentText'>
                   {this.props.body? (<p>{this.props.body} </p>):(<p>Some Text</p>)} 
                  </div>

                  {this.state.currentSingedUser === this.props.userId ?
                  (<div onClick={()=>{this.handleRemoveReply(this.props.commentId, this.props.id)}}  id='deleteComment'>
                  <img style={{width: 15 + 'px', height: 15 + 'px',  padding: 8 + 'px',marginRight: 2 + 'px'}}  src={require('../../assets/close_icon.png')} alt='delete comment'/>
              </div>)
                  :
                  (null)}
                </div>

                <div id='commentActions'>
                {this.state.timePassed ? (<span>{this.state.timePassed}</span>):(<span>.............</span>)}

                    {likeCount}

                    {this.state.isLiked ?
                    (<img  onClick={()=>{this.likePost(this.props.id)}} src={require('../../assets/heartlike.png')}/>)
                     :
                    (<img  onClick={()=>{this.likePost(this.props.id)}} src={require('../../assets/heartunlike.png')}/>)}
                    
                </div>
                                     
            </div>
        )
    }
}
export default withRouter(Reply)