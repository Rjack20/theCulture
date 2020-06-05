import React, { Component } from 'react'
import {withRouter} from 'react-router'
import TextField from '@material-ui/core/TextField';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import './style.css'
import app from '../../base'
import Reply from '../Reply';
import LikesPopup from '../LikesPopup'
import moment from 'moment'

class Comment extends Component {
    constructor(props){
        super(props)
        this.handleRemoveComment = this.handleRemoveComment.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getTimePassed = this.getTimePassed.bind(this)
        this.addReply = this.addReply.bind(this)
        this.emptyReply = this.emptyReply.bind(this)
        this.getReplies = this.getReplies.bind(this)
        this.getReplyCount = this.getReplyCount.bind(this)
        this.hideOrShowReplies = this.hideOrShowReplies.bind(this)
        this.checkIsLiked = this.checkIsLiked.bind(this)
        this.getLikeCount = this.getLikeCount.bind(this)
        this.openLikes = this.openLikes.bind(this)
        this.closeLikes = this.closeLikes.bind(this)
        this.likes = this.likes.bind(this)
        this.replies = this.replies.bind(this)
        this.likePost = this.likePost.bind(this)
        this.likeRef = app.database().ref('Likes')
        this.replyRef = app.database().ref('Reply')
        this.userRef = app.database().ref('Users')
        this.commentRef = app.database().ref('Comments')


        this.state ={
            isLiked: false,
            likeCount: null,
            replyCount: null,
            currentSingedUser: null,
            timePassed:'',
            timePosted: '',
            open: false,
            body: null,
            showReply: false,
            replyList: []
        }
    }

    hideOrShowReplies(){
      if(this.state.showReply){
          this.setState({
              showReply: false
          })
      }else{
          this.setState({
              showReply: true
          })
      }
      
   }


   //comment time
   getTimePassed(){
      this.commentRef.child(this.props.postId)
      .child('comment')
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


   emptyReply(){
      toast("Reply body is empty!", {
          className: 'custom-toast',
          draggable: true,
          position: toast.POSITION.BOTTOM_CENTER
      })
  }


   addReply(){
      if(this.state.body === ''){
          this.emptyReply()
          return
      }else{
          var userdId = app.auth().currentUser.uid
          var replyRef = this.replyRef.child(this.props.id).child('replies')
           let reply = {}
                   reply['userId'] = userdId;
                   reply['body'] = this.state.body;
                   reply['timePosted'] = Date.now();
                   
                 replyRef.push(reply).then(()=>{
                   this.setState({
                       body: ''
                   })
                 })
      }
              
   }


   handleChange(e){
      this.setState({
          body: e.target.value
      })
  
   }

    handleRemoveComment(id){
        this.props.removeComment(id)
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

 replies(){
   if(this.state.replyCount > 1 && !this.state.showReply){
      return(
        <span onClick={()=>{this.hideOrShowReplies()}}>Show Replies({this.state.replyCount})</span>
      )
   }
   if(this.state.replyCount === 1 && !this.state.showReply){
      return(
        <span onClick={()=>{this.hideOrShowReplies()}}>Show Reply({this.state.replyCount})</span>
      )
   }
   if(this.state.replyCount === 1 && this.state.showReply){
      return(
        <span onClick={()=>{this.hideOrShowReplies()}}>Hide Reply({this.state.replyCount})</span>
      )
   }
   if(this.state.replyCount < 1){
     return(
        <span onClick={()=>{this.hideOrShowReplies()}}>Reply</span>
      )
   }else if(this.state.replyCount > 1 && this.state.showReply){
     return(

        <span onClick={()=>{this.hideOrShowReplies()}}>Hide Replies({this.state.replyCount})</span>
      )
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

getReplyCount(commentId){
   this.replyRef.child(commentId).child('replies').on('value', snap=>{
      if(snap.exists()){
         this.setState({
            replyCount: snap.numChildren()
         })
         
      }
   })
}

getReplies(commentId){
   const previousReplyList = this.state.replyList
   var replyRef = this.replyRef.child(commentId).child('replies')

   replyRef.on('child_added', snap=>{
      this.userRef.child(snap.val().userId).on('value', data=>{
         previousReplyList.push({
            id: snap.key,
            userId: snap.val().userId,
            body: snap.val().body,
            userName: data.val().userName,
            profileImage: data.val().profileImage,
            label: data.val().label,
            city: data.val().city,
         })
         this.setState({
            replyList: previousReplyList
         })
      })
     
   })

   replyRef.on('child_removed', snap=>{
      for(var i=0; i < previousReplyList.length; i++){
         if(previousReplyList[i].id === snap.key){
           previousReplyList.splice(i, 1);
         }
       }
 
       this.setState({
         replyList: previousReplyList
       })
   })
}
 componentDidMount(){

    if(!this.props.id){
       return
    }else{
      this.getTimePassed()
      this.checkIsLiked(this.props.id)
     this.getLikeCount(this.props.id)
     this.getReplyCount(this.props.id)
    }
     
 }

 componentWillMount(){
    this.getReplies(this.props.id)
   app.auth().onAuthStateChanged((user)=>{
      if(user){
         this.setState({
            currentSingedUser: user.uid
         })
      }else{

      }
   })
 }


    render() {
      var replyCount = this.replies()
        var likeCount = this.likes()
        return (
            <div id='comment'>
               <LikesPopup
               id={this.props.id}
               open={this.state.open}
               close={this.closeLikes}
               />
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
                      {this. props.userName ? (<span>{this.props.userName}</span>):(<span>userName</span>)}
                      {this. props.label ? (<span>{this.props.label}</span>):(<span>label</span>)}
                      {this. props.city ? (<span>{this.props.city}</span>):(<span>city</span>)}
                      <span>rank</span>
                  </div>

                  <div id='commentText'>
                    <p>{this.props.body} </p>
                  </div>

                  {this.state.currentSingedUser === this.props.userId ?
                  (<div onClick={()=>{this.handleRemoveComment(this.props.id)}}  id='deleteComment'>
                  <img style={{width: 15 + 'px', height: 15 + 'px',  padding: 8 + 'px',marginRight: 2 + 'px'}}  src={require('../../assets/close_icon.png')} alt='delete comment'/>
              </div>)
                  :
                  (null)}
                </div>

                <div id='commentActions'>
                {this.state.timePassed ? (<span>{this.state.timePassed}</span>):(<span>.............</span>)}
                    {likeCount}
                   {replyCount}
                    {this.state.isLiked ?
                    (<img  onClick={()=>{this.likePost(this.props.id)}} src={require('../../assets/heartlike.png')}/>)
                     :
                    (<img  onClick={()=>{this.likePost(this.props.id)}} src={require('../../assets/heartunlike.png')}/>)}
                    
                </div>
                {this.state.showReply ? (this.state.replyList ? (this.state.replyList.map((rep)=>{
                   return(
                     <Reply 
                     key={rep.id}
                     commentId={this.props.id}
                     id={rep.id}
                     userId={rep.userId}
                     body={rep.body}
                     profileImage={rep.profileImage}
                     userName={rep.userName}
                     label={rep.label}
                     city={rep.city}
                     />
                   )
                })):(null))
                :(null)}
                     <TextField fullWidth rowsMax={4} value={this.state.body} onChange={this.handleChange}  id="standard-textarea" label="Reply..."  name='reply' inputProps={{maxLength: 255,}} multiline/>
                     {this.state.body ?
                     (<span id='replyReady' onClick={this.addReply}>Post</span>):
                     (<span id='replyEmpty' onClick={this.addReply}>Post</span>)}
            </div>
        )
    }
}

export default withRouter(Comment)