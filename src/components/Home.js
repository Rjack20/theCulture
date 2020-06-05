import React,{useEffect, useState, Component} from 'react'
import '../css/home.css'
import {AuthContext} from '../Auth'
import app from '../base'
import {Grid} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddPost from './AddPost'
import FeedPost from './FeedPost'
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router'
import SearchedUsers from './SearchedUsers'
import moment from 'moment'





class Home extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getFollowingPost = this.getFollowingPost.bind(this)
        this.printDate =   this.printDate.bind(this)
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.removePost = this.removePost.bind(this)
    
        this.noInputToast = this.noInputToast.bind(this)
        this.videoAndPhotoToastError = this.videoAndPhotoToastError.bind(this)
        this.albumandMixtape = this.albumandMixtape.bind(this)
        this.handleCloseModel = this.handleCloseModel.bind(this)
        this.removeDuplicates = this.removeDuplicates.bind(this)
        this.noTitle = this.noTitle.bind(this)
        this.noArtistToast = this.noArtistToast.bind(this)
        this.postRef = app.database().ref().child('Post')
        this.likeRef = app.database().ref().child('Likes')
        this.userRef = app.database().ref().child('Users')
        this.folllowRef = app.database().ref().child('Follow')
        

        this.state = {
            open: false,
            value: 0,
            user: null,
            currentUserName: null,
            currentUserId: null,
            searchField: '',
            searchedUsers: [],
            followList:[],
            finalSearchedUsers:{},
            loading: true,
            deletedPostOpen: false,
            postLiked: false,
            imageUri: '',
            imageUrl: '',
            audioUri: '',
            audioUrl: '',
            videoUri: '',
            videoUrl: '',
            description: '',
            text: '',
            coverArtUri: '',
            coverArt: '',
            title: '',
            artist: '',
            album: '',
            mixtape: '',
            imageProgress: 0,
            audioProgress: 0,
            videoProgress: 0,
            postList: []
        }
    }

      noInputToast(){
        toast("Can't create an empty post.", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

     albumandMixtape(){
        toast("Error: Album and Mixtape cant both have values", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
     noTitle(){
        toast("Title must be filled", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    videoAndPhotoToastError(){
        toast("Error: Cant load image and video at the same time", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    

     noArtistToast(){
        toast("Missing a artist name", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }





      removePost = (postId) => {
          var uid = app.auth().currentUser.uid
       if(!uid){
       
        return
       }else{
           
        this.postRef.child(uid).child('post').child(postId).remove()
        .then(()=>{
            this.setState({
                deletedPostOpen: true
            })
        })
       }
    }
   
  
    
    handleClick(){
        this.setState({
            open: true
        })
    }

    handleClose(){
        
        
        this.setState({
            open: false,
            deletedPostOpen:false
        })
    }
     handleChange = (event, newValue) => {
         this.setState({
             value: newValue
         })

      };

      handleCloseModel(){
        this.setState({
            
            deletedPostOpen: false,
       
        })
    }


getCurrentUser = (id)  => {
    this.userRef.child(id).on('value', snap=>{
        if(snap.exists()){
            this.setState({
                currentUserName: snap.val().userName,
                profileImage: snap.val().profileImage
            })
        }
    })
}


    handleSearchInput(e){
       var finalList = this.state.searchedUsers
        if(e.target.value !== null || e.target.value !== ''){
            this.setState({
                searchField: e.target.value 
            })
        }
       
        if(this.state.searchField !== null || this.state.searchField !== ''){
           var query = this.userRef.orderByChild('userName')
            .startAt(this.state.searchField)
            .endAt(this.state.searchField + '\uf8ff')
            .once('value', function(snap) {
             //console.log( snap.val().userName );
            });

            Promise.resolve(query).then(results => {
                results.forEach(result => {
                    if(result.val().userName.includes(this.state.searchField)){
                        finalList.push(result.val())
                    }else{
                        
                    }
                 
                
                });
             var updatedList =  this.removeDuplicates(finalList, 'userId')
               this.setState({
                searchedUsers: updatedList
            })
           
          });
        }

        if(e.target.value === ""){
            this.setState({
                searchedUsers: []
            })
        }
       
    }
    
getFollowingPost(id){
   
 
}

     removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }


printDate(){
    var time = Date.now()
    var res
    setInterval(function(){
        res = moment(time).startOf('minute').fromNow(); 
        console.log(res) 
        }, 3000)
      return res
}
    componentWillMount(){
     
        app.auth().onAuthStateChanged((user)=> {
            if(user){
           
                this.setState({
                    currentUserId: user.uid
                     })
                    this.getFollowingPost(user.uid)
                     this.getCurrentUser(user.uid)
                     const previousPostList = this.state.postList
       
                     var postRef = app.database().ref('Post').child(this.state.currentUserId).child('post')
                     var userRef = app.database().ref('Users')
             
                     postRef.on('child_added', snap=>{
                         if(this.state.currentUserId === snap.val().userId){
             
                         userRef.child(this.state.currentUserId).on('value', data=>{
                             previousPostList.push({
                                 id: snap.key,
                                 userId: snap.val().userId,
                                 profileImage: data.val().profileImage,
                                 userName: data.val().userName,
                                 label: data.val().label,
                                 text: snap.val().text,
                                 photo: snap.val().photo,
                                 video: snap.val().video,
                                 description: snap.val().description,
                                 audio: snap.val().audio,
                                 coverArt: snap.val().coverArt,
                                 title: snap.val().title,
                                 artist: snap.val().artist,
                                 album: snap.val().album,
                                 mixtape: snap.val().mixtape,
                             })
                             this.setState({
                                 postList: previousPostList
                             })
                             
                         })
                     
                         }
                         
                     })
                     postRef.on('child_removed', snap=>{
                         for(var i=0; i < previousPostList.length; i++){
                             if(previousPostList[i].id === snap.key){
                               previousPostList.splice(i, 1);
                             }
                           }
                     
                           this.setState({
                             postList: previousPostList
                           })
                     })
                
            }else {

                console.log(this.state.currentUserId)
            }
           
            
          });
      
    }
    
      
 render(){
    return (
        
        <div id='main'>
             <>
                <ToastContainer/>
             </>
            <h1>Home</h1>
            <Grid
            container
            spacing={1}
          
            >
                <Grid
                item
                xs={12}
                    sm={12}
                    md={3}
                    lg={3}
                    xl={3}
                >
                    <p>Profile</p>
                    <div id='profile'>
                        <div onClick={()=>{
                             this.props.history.push('/user/' + this.state.currentUserId )   
                          }}>
                            {this.state.profileImage ? (<img src={this.state.profileImage} alt='profile image'/>):(<img src={require('../assets/noimage.png')} alt='profile image'/>)}
                        </div>
                        <div>
                        {this.state.currentUserName ? (<p  onClick={()=>{
                             this.props.history.push('/user/' + this.state.currentUserId )   
                          }}>{this.state.currentUserName}</p>):(<p  onClick={()=>{
                            this.props.history.push('/user/' + this.state.currentUserId )   
                         }}>username</p>)}  
                        </div>
                    </div>
    
                    <TextField onChange={this.handleSearchInput} value={this.state.searchField} fullWidth id="filled-search" label="Search Username" type="search" variant="filled" />
                     {this.state.searchedUsers && this.state.searchField !== '' ? 
                     (this.state.searchedUsers.map((user)=>{
                        return(
                            <SearchedUsers
                            key={user.userId}
                            id={user.userId}
                            profileImage={user.profileImage}
                            userName={user.userName}
                            label={user.label}
                            city={user.city}

                            />
                        )
                     }))
                     :
                     (null)}
                    
                   

                </Grid>
                <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                >
                     <p>Post</p>
                      {this.state.postList ? this.state.postList.reverse().map((post)=>{
                          return(
                            <FeedPost
                            key={post.id}
                            id={post.id}
                            userId={post.userId}
                            userName={post.userName}
                            profileImage={post.profileImage}
                            label={post.label}
                            text={post.text}
                            photo={post.photo}
                            audio={post.audio}
                            video={post.video}
                            description={post.description}
                            artist={post.artist}
                            title={post.title}
                            album={post.album}
                            coverArt={post.coverArt}
                            removePost={this.removePost}
                           
                            />
                          ) 
                      }): null}
                      
                </Grid>

            </Grid>
            <div id='addPost'>
           
            </div>
            <Dialog
                        open={this.state.deletedPostOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
             <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
              <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    This post has been permanently removed.
                </DialogContentText>
               </DialogContent>
              
              <DialogActions>
                <Button onClick={this.handleCloseModel} 
                    color="primary" autoFocus>
                    Close
                </Button>
               </DialogActions>
            </Dialog>
        </div>
    )

  }
}
export default withRouter(Home)