import React,{useContext, useState, Component} from 'react'
import {withRouter} from 'react-router-dom'
import '../../css/home.css'
import app from '../../base'
import {Grid} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import AddIcon from '@material-ui/icons/Add';
import LikesPopup from '../LikesPopup'
import Comment from '../Comment'
import moment from 'moment'
import './styles.css'



 class FeedPost extends Component {
   constructor(props){
      super(props)
      //audio
      this.getTime = this.getTime.bind(this)
      //post time
      this.getTimePassed = this.getTimePassed.bind(this)
      this.closeLikes = this.closeLikes.bind(this)
      this.handleRemovePost = this.handleRemovePost.bind(this)
    
      this.likes = this.likes.bind(this)
      this.comments = this.comments.bind(this)
      this.addToLibray = this.addToLibray.bind(this)
      this.add = this.add.bind(this)
      this.songAddedToPlaylist = this.songAddedToPlaylist.bind(this)
      this.handleLikePost = this.handleLikePost.bind(this)
      this.getLikeCount = this.getLikeCount.bind(this)
      this.getLikeCount = this.getLikeCount.bind(this)
      this.getFirstComment = this.getFirstComment.bind(this)
      this.checkIsLiked = this.checkIsLiked.bind(this)
      this.checkInPlaylist = this.checkInPlaylist.bind(this)
      this.likeRef = app.database().ref('Likes')
      this.commentRef = app.database().ref('Comments')
      this.postRef = app.database().ref('Post')
      this.playlistRef = app.database().ref('Playlist')
      
      this.state = {
         inPlaylist: false,
         postLiked: false,
         open: false,
         timePassed:'',
         timePosted: '',
         likeCount: null,
         currentSignedUser: null,
         firstComment:[],
         commentCount: null,
         currentSong: null,
         music: 'stopped',
         currentTime: null,
         duration: null
     }
      
   }

   
  checkInPlaylist(){
   const playlistRef = app.database().ref('Playlist')
   playlistRef.child(this.state.currentSignedUser)
   .child('playlist')
   .child(this.props.id)
   .on('value', snap=>{
       if(snap.exists()){
           this.setState({
               inPlaylist: true
           })
       }else{
           this.setState({
               inPlaylist: false
           })
       }
   })
   }
 

   songAddedToPlaylist(){
      toast("Song Added To Your Library.", {
          className: 'custom-toast',
          draggable: true,
          position: toast.POSITION.BOTTOM_CENTER
      })
  }


   addToLibray(){
      var currentUid = app.auth().currentUser.uid
  
      this.postRef.child(this.props.userId).child('post')
      .child(this.props.id).on('value', snap=>{
        
          if(snap.exists()){
              
           this.add(snap.val(), currentUid)
          }
          
      })
      
  }

   add(obj, id){
      this.playlistRef.child(id).child('playlist').push(obj)
      .then(()=>{
          this.songAddedToPlaylist()
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
                  postLiked: true
               })
            }else{
               this.setState({
                  postLiked: false
               })
            }
         })
      }
     
   }

   getFirstComment(id){
     var query = this.commentRef.child(id).child('comment')
      .once('value', snap=>{
        
      })
      Promise.resolve(query).then(results => {
         results.forEach(result => {
          
         console.log(result.val())

         });
         
       });
   }



   handleRemovePost(id){
      this.props.removePost(id)
   }



   handleLikePost(id){
      var userdId = app.auth().currentUser.uid
      if(!userdId){
         return
      }else{

         if(this.state.postLiked){
            this.likeRef.child(id).child(userdId).remove()
         }else{
            this.likeRef.child(id).child(userdId).set(true)
         }
         
      }
   }



   getTimePassed(){
      this.postRef.child(this.props.userId)
      .child('post')
      .child(this.props.id)
      .on('value', snap=>{
         if(snap.exists()){
           
            setInterval(()=>{
              
               this.setState({
                  timePassed:  moment(snap.val().timePosted).startOf('minute').fromNow()
               }) 
               },1000)
         }
      })
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
   getCommentCount(id){
      this.commentRef.child(id).child('comment').on('value', snap=>{
         if(snap.exists()){
            this.setState({
               commentCount: snap.numChildren()
            })
         }
      })
   }

     //get time
     getTime = (time)=>{
      if(!isNaN(time)){
          return(
              Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
          )
      }
  }

  openLikes(){
   this.setState({
      open: true
   })
  }

 componentWillMount(){
    
   app.auth().onAuthStateChanged((user)=>{
      if(user){
         this.setState({
            currentSignedUser: user.uid
         })
      }
      this.checkInPlaylist()
   })
   if(!this.props.id){
      return
   }else{
      this.checkIsLiked(this.props.id)
      this.getLikeCount(this.props.id)
      this.getCommentCount(this.props.id)
      
   }
 
 }

   componentDidMount() {
     this.getTimePassed()
      
      if(!this.props.audio){
         return
      }else{
         this.player.src = this.props.audio
      this.player.addEventListener("timeupdate", e => {
        
        this.setState({
          currentTime: e.target.currentTime,
          duration: e.target.duration
        });

        if(!this.player){
            return
        }else{
          var position = this.player.currentTime / this.player.duration;
          
          this.fillbar.style.width = position * 100 +'%';
        }
      });
      }
      
    }

    likes(){
       if(this.state.likeCount === 1){
          return(
            <span onClick={()=>{
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

            <span onClick={()=>{
               this.openLikes()
            }}>{this.state.likeCount} Likes</span>
          )
       }
    }

   
    comments(){
      if(this.state.commentCount === 1){
         return(
           <span onClick={()=>{
            this.props.history.push('/post/' + this.props.userId + '/' + this.props.id
            )
         }}>{this.state.commentCount} Comment</span>
         )
      }
      if(this.state.commentCount < 1){
        return(
           null
         )
      }else{
        return(

           <span onClick={()=>{
            this.props.history.push('/post/' + this.props.userId + '/' + this.props.id
            )
         }}>{this.state.commentCount} Comments</span>
         )
      }
   }
  closeLikes(){
     this.setState({
        open: false
     })
  }
    
   componentWillUnmount() {
      
      if(this.props.audio){
         this.player.removeEventListener("timeupdate", () => {});
      }
      
    }
  
  
render(){
         
        const currentTime = this.getTime(this.state.currentTime)
        const duration = this.getTime(this.state.duration)
        var likeCount = this.likes()
        var commentCount = this.comments()
        
    return (
        
       
           
             <div id='postFeed'>

                 <>
                <ToastContainer/>
                 </>

                <LikesPopup
                id={this.props.id}
                open={this.state.open}
                close={this.closeLikes}
                />
               <div id='postInfo'>
                          <div onClick={()=>{
                             this.props.history.push('/user/' + this.props.userId )
                          }}>
                         {this.props.profileImage ? (<img src={this.props.profileImage} alt='profile image'/>):(<img src={require('../../assets/noimage.png')} alt='profile image'/>)}  
                          </div>
                          <div onClick={()=>{
                             this.props.history.push('/user/' + this.props.userId )
                          }} id='userInfo'>
                              <div>
                                <p>{this.props.userName}</p>
                              </div>
                              <div>
                                 <p>{this.props.label}</p>
                              </div>
                              <div>
                                <p>rank</p>
                              </div>
                            
                          </div>
                          
                        {this.state.currentSignedUser === this.props.userId ? 
                        (<div id='closeContainer'>

                           <div onClick={()=>{this.handleRemovePost(this.props.id)}}  id='closeBtn'>
                             &times;
                           <span id="tooltiptext1">Delete Post</span>
                           </div>

                         </div>
                        )
                        :(null)}
                                           
                        </div>

                          <div id='time' >
                          {this.state.timePassed ? (<span>{this.state.timePassed}</span>):(<span>.............</span>)}
                          </div>

                        <div id='postContent'>
                          <div id='postPhoto'>
                             {this.props.photo ? (<img src={this.props.photo} alt='post image'/>):(null)}
                          </div>
                          {this.props.audio ? (<div id='audioContent'>
                          <audio ref={ref=>(this.player = ref)}/>
                              <div>
                                 <img src={this.props.coverArt}/>
                              </div>
                              <div id='infoAndControls'>

                                 <div id='audioPostInfo'>

                                 <div>
                                     <p>{this.props.artist}</p>
                                 </div>
                                 
                                 <div>
                                    <p>{this.props.title}</p>
                                 </div>

                                 <div>
                                    <p>{this.props.album}</p>
                                 </div>

                                 <div>
                                    <p>{this.props.mixtape}</p>
                                 </div>

                                 </div>
                              {this.state.inPlaylist ? (null):( <div onClick={this.addToLibray} id='addIconFeedPost'>
                                    <AddIcon fontSize='large'/>
                                    <span id="tooltiptextAddDetails2">Add To Your Library</span>
                                 </div>)}
                                
                                 
                                 <div id='audioPostControls'>
                                 {this.state.music === 'playing' ? 
                                    (<img onClick={()=>{
                                          this.player.pause()
                                          this.setState({
                                             music: 'paused'
                                          })
                                    }} src={require('../../assets/pause.png')}/>)
                                       :
                                       (<img onClick={()=>{
                                          this.player.play()
                                          this.setState({
                                             music: 'playing'
                                          })
                        
                                    }} src={require('../../assets/play.png')}/>)} 
                                       <p>{currentTime} / {duration}</p>
                                    <div id="seek-barT">
                                       <div ref={ref=> this.fillbar = ref} id="fillT">
                                          
                                      </div>
                                       <div id="handleT">

                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <hr/>
                          </div>):(null)}
                        {this.props.text ? (<div id='textContent'>
                        <p>{this.props.text}</p>
                        </div>):(null)}
                        {this.props.video ? (<div id='videoContent'>
                           <video src={this.props.video} controls >

                           </video>
                        </div>):(null)}
                        {this.props.description ? (<div id='description'>
                           <span onClick={()=>{
                             this.props.history.push('/user/' + this.props.userId )
                          }} >{this.props.userName}</span>
                           <p>{this.props.description}</p>
                        </div>):(null)}
                          
                        </div>
                        <div id='postControls'>
                            <div>
                               {this.state.postLiked ? (<img onClick={()=>{this.handleLikePost(this.props.id)}} id='likeIcon' src={require('../../assets/heartlike.png')} alt='like'/>):(<img onClick={()=>{this.handleLikePost(this.props.id)}} id='likeIcon' src={require('../../assets/heartunlike.png')} alt='like'/>)}
                               <img onClick={()=>{
                                  this.props.history.push('/post/' + this.props.userId + '/' + this.props.id
                                  )
                               }} id='commentIcon' src={require('../../assets/comment_icon.png')} alt='like'/>
                            </div>
                            <div id='postLikesComments'>
                               {likeCount}
                               {commentCount}
                            </div> 

                        </div>
                       
                     </div>
       
    )
    }
    
}


export default withRouter(FeedPost)