import React, { Component } from 'react'
import './style.css'
import app from '../../base'
import {Grid, colors} from '@material-ui/core'
import {Rating} from '@material-ui/lab';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Comment from '../../components/Comment'
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router'
import LikesPopup from '../LikesPopup'
import moment from 'moment'


 class PostDetails extends Component {
    constructor(props){
        super(props)
       
        //audio
        this.getTime = this.getTime.bind(this)
        //post time
        this.getTimePassed = this.getTimePassed.bind(this)
        //delete comment
        this.removeComment = this.removeComment.bind(this)
        this.addToLibray = this.addToLibray.bind(this)
        this.add = this.add.bind(this)
        this.songAddedToPlaylist = this.songAddedToPlaylist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.openLikes = this.openLikes.bind(this)
        this.closeLikes = this.closeLikes.bind(this)
        this.emptyComment = this.emptyComment.bind(this)
        this.commentDeleted = this.commentDeleted.bind(this)
        this.likes = this.likes.bind(this)
        this.comments = this.comments.bind(this)
        this.getLikeCount = this.getLikeCount.bind(this)
        this.getCommentCount = this.getCommentCount.bind(this)
        this.handleLikePost = this.handleLikePost.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.currentUser = app.auth().currentUser.uid
        this.checkLike = this.checkLike.bind(this)
        this.getCurrentRating = this.getCurrentRating.bind(this)
        this.checkIfUserRatedThisPost = this.checkIfUserRatedThisPost.bind(this)
        this.likeRef = app.database().ref('Likes')
        this.commentRef = app.database().ref('Comments')
        this.postRef = app.database().ref('Post')
        this.playlistRef = app.database().ref('Playlist')
        this.userRef = app.database().ref('Users')
        this.ratingRef = app.database().ref('Rating')
        this.checkInPlaylist = this.checkInPlaylist.bind(this)
    
       
        

        this.state = {
           inPlaylist: false,
            isLiked: false,
            likeCount: null,
            ratingValue: null,
            ratingScore: null,
            previousRating: null,
            isRated: false,
            timePassed:'',
            timePosted: '',
            open: false,
            commentCount: null,
            currentSong: null,
            comments:[],
            body:'',
            music: 'stopped',
            currentTime: null,
            duration: null
        }

    }


    checkInPlaylist(){
    const playlistRef = app.database().ref('Playlist')
    playlistRef.child(this.currentUser)
    .child('playlist')
    .child(this.props.postId)
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



    emptyComment(){
        toast("Comment body is empty!", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    
    commentDeleted(){
        toast("Comment deleted", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }



//post time
    getTimePassed(){
        this.postRef.child(this.props.userId)
        .child('post')
        .child(this.props.postId)
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



//check if the current user liked the post
    checkLike(){
        this.likeRef.child(this.props.postId).child(this.currentUser).on('value', snap=>{
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


//get the like count of the post
getLikeCount(id){
        this.likeRef.child(id).on('value', snap=>{
           if(snap.exists()){
              this.setState({
                 likeCount: snap.numChildren()
              })
           }
        })
     }



//get the comment count of the post
     getCommentCount(id){
        this.commentRef.child(id).child('comment').on('value', snap=>{
           if(snap.exists()){
              this.setState({
                 commentCount: snap.numChildren()
              })
           }
        })
     }



//get time for audio
getTime = (time)=>{
    if(!isNaN(time)){
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
}



//like the post button 
handleLikePost(id){
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


//like conditiondal display
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


//comments conditional display
 comments(){
    if(this.state.commentCount === 1){
       return(
         <span>{this.state.commentCount} Comment</span>
       )
    }
    if(this.state.commentCount < 1){
      return(
         null
       )
    }else{
      return(

         <span>{this.state.commentCount} Comments</span>
       )
    }
 }

 //comment input handler
 handleChange(e){
    this.setState({
        body: e.target.value
    })

 }

 //post comment handler event
 addComment=()=>{

    if(this.state.body === ''){
        this.emptyComment()
        return
    }else{
        var userdId = app.auth().currentUser.uid
        var commentRef = this.commentRef.child(this.props.postId).child('comment')
         let comment = {}
                 comment['userId'] = userdId;
                 comment['body'] = this.state.body;
                 comment['timePosted'] = Date.now();
                 
               commentRef.push(comment).then(()=>{
                 this.setState({
                     body: ''
                 })
               })
    }
            
 }

 //delete comment button handler
 removeComment = (commentId) => {
    var uid = app.auth().currentUser.uid
 if(!uid){
 
  return
 }else{
     
  this.commentRef.child(this.props.postId).child('comment').child(commentId).remove()
  .then(()=>{
      this.commentDeleted()
  })
 }
}

//open the liked users list
openLikes(){
    this.setState({
       open: true
    })
   }

   //close the liked users list
closeLikes(){
    this.setState({
       open: false
    })
 }

 
addToLibray(){
    var currentUid = app.auth().currentUser.uid

    this.postRef.child(this.props.userId).child('post')
    .child(this.props.postId).on('value', snap=>{
      
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

handleRatingChange(e, ratingValue){
        if(ratingValue){
            this.setState({
                ratingValue: ratingValue
            })
            if(ratingValue === 1){
                this.setState({
                    ratingScore: 2
                })
            }
            if(ratingValue === 2){
                this.setState({
                    ratingScore: 4
                })
            }
            if(ratingValue === 3){
                this.setState({
                    ratingScore: 6
                })
            }
            if(ratingValue === 4){
                this.setState({
                    ratingScore: 8
                })
            }
            if(ratingValue === 5){
                this.setState({
                    ratingScore: 10
                })
            }
            this.ratingRef. child(this.currentUser)
            .child('rating')
            .child(this.props.postId)
            .set(true)
            .then(()=>{
                
            this.userRef.child(this.props.userId).update({
                rating: this.state.previousRating + this.state.ratingScore
            }).then(()=>{
                this.setState({
                    isRated: true
                })
            })

            })

            
        }
  
   
}


    getCurrentRating(id){
    this.userRef.child(id).on('value', snap=>{
        if(snap.exists()){

            this.setState({
                previousRating: parseInt(snap.val().rating) 
            })
        }
    })
    }

    checkIfUserRatedThisPost(){
    this.ratingRef.child(this.currentUser)
    .child('rating')
    .child(this.props.postId)
    .on('value', snap=>{
    if(snap.exists()){
        this.setState({
            isRated: true
        })
    }
    })
    }

 //lifecycle method
componentDidMount(){

   this.checkIfUserRatedThisPost()
   this.getCurrentRating(this.props.userId)
   this.checkInPlaylist()
   this.getLikeCount(this.props.postId)
   this.getCommentCount(this.props.postId)
   this.getTimePassed()
   this.checkLike()

   const previousComments = this.state.comments
   var userRef = app.database().ref('Users')
   var commentRef = this.commentRef.child(this.props.postId).child('comment')
   commentRef.on('child_added', snap=>{
       userRef.child(snap.val().userId).on('value', data=>{
        previousComments.push({
            id: snap.key,
            userId: snap.val().userId,
            body: snap.val().body,
            userName: data.val().userName,
            profileImage: data.val().profileImage,
            label: data.val().label,
            city: data.val().city,
        })
        this.setState({
            comments: previousComments
        })
       
       })
       
   })
   commentRef.on('child_removed', snap=>{
    for(var i=0; i < previousComments.length; i++){
        if(previousComments[i].id === snap.key){
          previousComments.splice(i, 1);
        }
      }

      this.setState({
        comments: previousComments
      })
   })



  
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


componentWillUnmount() {
    if(this.props.audio){
       this.player.removeEventListener("timeupdate", () => {});
    }
    
  }



    render() {
        const currentTime = this.getTime(this.state.currentTime)
        const duration = this.getTime(this.state.duration)
        var likeCount = this.likes()
        var commentCount = this.comments()
        return (
            <div id='postDetails'>
                <LikesPopup
                id={this.props.postId}
                open={this.state.open}
                close={this.closeLikes}
                />
                 <>
                <ToastContainer/>
                 </>
                 <audio ref={ref=>(this.player = ref)}/>
                <Grid
                container
                justify= 'center'
                >
                    <Grid
                    item
                    xs={10}
                    sm={6}
                    md={5}
                    lg={5}
                    >
                        <div id='postDetailsContent'>

                            <div onClick={()=>{
                             this.props.history.push('/user/' + this.props.userId )
                             
                          }}  id='postDetailsHeader'>

                                <div id='postDetailsHeaderImg'>
                                  <img src={this.props.profileImage}/>
                                </div>
                                <div id='postDetailsUserInfo'>
                                    <span>{this.props.userName}</span>
                                    <span>{this.props.label}</span>
                                    <span>{this.props.city}</span>
                                    <span>{this.props.rank}</span>
                                </div>

                            </div>

                            <div id='postDetailsTime'>
                            {this.state.timePassed ? (<span>{this.state.timePassed}</span>):(<span>.............</span>)}
                            </div>


                           {this.props.text ? (<div id='postDetailsText'>
                                <div id='postDetailsTextValue'>
                                        <span>{this.props.text}</span>
                                </div>
                            </div>):(null)}

                            <div id='postDetailsActions'>
                                            <div id='postDetailsActionsImg'>
                                              {this.state.isLiked ? 
                                            (<img onClick={()=>{
                                                this.handleLikePost(this.props.postId)
                                            }} src={require('../../assets/heartlike.png')}/>)
                                            :
                                            (<img onClick={()=>{
                                                this.handleLikePost(this.props.postId)
                                            }} src={require('../../assets/heartunlike.png')}/>)}
                                              {likeCount}

                                            <div>
                                            {commentCount}
                                            </div>
                                            </div>     
                            </div>


                            <div id='postDetailsContentView'>
                            
                                    {this.props.photo ? (<img src={this.props.photo}/>):(null)}
                                    {this.props.coverArt ? (<img src={this.props.coverArt}/>):(null)}
                                    {this.props.video ? (<video src={this.props.video} controls ></video>):(null)}
                                    
                                    {this.props.audio ?
                                    (
                                    <div id='postDetailsAudio'>
                                    
                                    <Grid
                                    container
                                    
                                  
                                    >

                                        <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        >
                                             <div id='infoAndAdd'>

                                        <div id='postDetailsAudioInfo'>
                                        <p>{this.props.artist}</p>
                                        <p>{this.props.title}</p>
                                        <p>{this.props.album}</p>
                                        <p>{this.props.mixtape}</p>
                                        </div>
                                        {this.state.inPlaylist ? (null):(
                                            <div onClick={this.addToLibray} id='addIcon'>
                                            <AddIcon fontSize='large'/>
                                            <span id="tooltiptextAddDetails">Add To Your Library</span>
                                          </div>
                                        )}
                                        

                                        </div>
                                        
                                        </Grid>

                                        <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        >
                                        <div id='postDetailsAudioPlayer'>
                                        
                                        {this.state.music === 'playing' ? 
                                         (<img onClick={()=>{
                                          this.player.pause()
                                          this.setState({
                                             music: 'paused'
                                          })
                                          }} src={require('../../assets/pause.png')}/>)
                                         :
                                         ((<img onClick={()=>{
                                          this.player.play()
                                          this.setState({
                                             music: 'playing'
                                          })
                        
                                         }} src={require('../../assets/play.png')}/>))}
                                        <p>{currentTime} / {duration}</p>
                                        <div id="seek-bar">
                                     <div ref={ref=> this.fillbar = ref} id="fill">
                                        
                                     </div>
                                     <div id="handle">

                                     </div>
                                      </div>
                                      </div>
                                        </Grid>

                                        <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        >
                                            
                                       <div id='rating'>
                                        {this.state.isRated ? 
                                                (<Rating
                                                disabled
                                                value={this.state.ratingValue}
                                                onChange={this.handleRatingChange}
                                                />):
                                                (<Rating
                                                value={this.state.ratingValue}
                                                onChange={this.handleRatingChange}
                                                />)}        
                                          {this.state.isRated ? (null):(<span id="tooltiptextRating">Give this song a rating</span>)}      
                                        </div>
                                       

                                        </Grid>


                                    </Grid>
                                    
       
                                       </div>
                                       )
                                         :
                                         (null)}


                            </div>

                            {this.props.description ? 
                                     (<div id='postDetailsDescription'><span id='commentDescriptionUserName'>{this.props.userName}</span>
                                     <span id='commentDescription'>{this.props.description}</span></div>)
                                    :
                            (null)} 
                                    
                            

                                    <div id='commentSection' >
                                        {this.state.comments ?
                                        ( this.state.comments.map((comment)=>{
                                            return(
                                                <Comment
                                                key={comment.id}
                                                id={comment.id}
                                                postId={this.props.postId}
                                                userId={comment.userId}
                                                body={comment.body}
                                                profileImage={comment.profileImage}
                                                userName={comment.userName}
                                                label={comment.label}
                                                city={comment.city}
                                                removeComment={this.removeComment}
                                                />
                                            )
                                        }))
                                        :
                                        (null)}
                                       
                                      
                                    </div>

                                    
            
                                    <div id='postDetailsInput'>
                                        <div id='addComment'>
                                        <TextField fullWidth rowsMax={4} value={this.state.body} onChange={this.handleChange}  id="standard-textarea" label="Add Comment..."  name='comment' inputProps={{maxLength: 255,}} multiline/>
                                        {this.state.body ?
                                        (<span id='commentReady' onClick={this.addComment}>Post</span>):
                                        (<span id='commentEmpty' onClick={this.addComment}>Post</span>)}
                                        
                                        </div>
                                    </div>

                        </div>

                    </Grid>
                   
                </Grid>

             
            </div>
        )
    }
}
export default withRouter(PostDetails)