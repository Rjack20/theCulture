import React,{Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './style.css'
import moment from 'moment'
import FeedPost from '../../components/FeedPost'
import app from '../../base'
import { withRouter } from 'react-router';
import UserInfo from '../UserInfo';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div id='tabBox'>
               <Box  p={3}>
                 <Typography>{children}</Typography>
               </Box>
          </div>
       
      )}
    </div>
  );
}

 class UserProfileTabs extends Component {
  constructor(props){
    super(props)
    
    
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.printDate =   this.printDate.bind(this)
    this.getFollowersUserData = this.getFollowersUserData.bind(this)
    this.getFollowingUserData = this.getFollowingUserData.bind(this)
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.removePost = this.removePost.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.getFollowCount = this.getFollowCount.bind(this)
    this.getFollowingCount = this.getFollowingCount.bind(this)
    this.handleCloseModel = this.handleCloseModel.bind(this)
    this.removeDuplicates = this.removeDuplicates.bind(this)
    this.postRef = app.database().ref().child('Post')
    this.likeRef = app.database().ref().child('Likes')
    this.userRef = app.database().ref().child('Users')
    this.followRef = app.database().ref().child('Follow')

    this.state = {
            
            value: 0,
            open: false,
            user: null,
            currentUserName: null,
            currentUserId: null,
            searchField: '',
            searchedUsers: [],
            followList:[],
            followers:[],
            following:[],
            followCount: '',
            followingCount: '',
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
  



  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };



handleUserInput(e){
  if(e.target.name === 'photo' && e.target.files[0]){
      this.setState({
          imageUri: e.target.files[0]
      })
      
  
      const uploadTask = app.storage().ref(`photo post/${this.state.imageUri.name}`).put(this.state.imageUri);
      uploadTask.on('state_changed', 
          (snapshot)=>{
              this.setState({
                  imageProgress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
              
          }, (error)=>{
              //error
              console.log(error)
          },(()=>{
              app.storage().ref('photo post').child(this.state.imageUri.name).getDownloadURL()
              .then(url =>{
                  this.setState({
                      imageUrl: url
                  })
           })
        })
      )
  }
  if(e.target.name === 'video' && e.target.files[0]){
      this.setState({
          videoUri: e.target.files[0]
      })
      
  
      const uploadTask = app.storage().ref(`video post/${this.state.videoUri.name}`).put(this.state.videoUri);
      uploadTask.on('state_changed', 
          (snapshot)=>{
              this.setState({
                  videoProgress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
              
          }, (error)=>{
              //error
              console.log(error)
          },(()=>{
              app.storage().ref('video post').child(this.state.videoUri.name).getDownloadURL()
              .then(url =>{
                  this.setState({
                      videoUrl: url
                  })
           })
        })
      )
  }
  if(e.target.name === 'audio' && e.target.files[0]){
      this.setState({
          audioUri:  e.target.files[0]
      })
     
      const uploadTask = app.storage().ref(`tracks/${this.state.audioUri.name}`).put(this.state.audioUri);
      uploadTask.on('state_changed', 
          (snapshot)=>{
              this.setState({
                  audioProgress:   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
             

          }, (error)=>{
              //error
              console.log(error)
          },(()=>{
              app.storage().ref('tracks').child(this.state.audioUri.name).getDownloadURL()
              .then(url =>{
                  this.setState({
                      audioUrl: url
                  })
           })
        })
      )
  }
  if(e.target.name === 'coverArt' && e.target.files[0]){
      this.setState({
          coverArtUri: e.target.files[0]
      })
     
      const uploadTask = app.storage().ref(`cover art/${this.state.coverArtUri.name}`).put(this.state.coverArtUri);
      uploadTask.on('state_changed', 
          (snapshot)=>{
              this.setState({
                  imageProgress: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
          }, (error)=>{
              //error
              console.log(error)
          },(()=>{
              app.storage().ref('photo post').child(this.state.coverArtUri.name).getDownloadURL()
              .then(url =>{
                  this.setState({
                      coverArt: url
                  })
           })
        })
      )
  }
  if(e.target.name === 'text'){
      this.setState({
          text: e.target.value
      })
  }
  if(e.target.name === 'description'){
      this.setState({
          description: e.target.value
      })
  }
  if(e.target.name === 'artist'){
      this.setState({
          artist: e.target.value
      })
  }
  if(e.target.name === 'title'){
      this.setState({
          title: e.target.value
      })
      
  }
  if(e.target.name === 'album'){
      this.setState({
          album: e.target.value
      })
  }
  if(e.target.name === 'mixtape'){
      this.setState({
          mixtape: e.target.value
      })
  }
  
 
};




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



handleClose(){
  
  
  this.setState({
      open: false,
      deletedPostOpen:false
  })
}



handleCloseModel(){
 this.setState({
     
     deletedPostOpen: false,

 })
}


getCurrentUser = (id)  => {
  this.userRef.child(id).on('value', snap=>{
      if(snap.exists()){
          this.setState({
              currentUserName: snap.val().userName
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
            finalList.push(result.val())
           
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

getFollowCount(id){
    this.followRef.child(id).child('followers').on('value', snap=>{
       if(snap.exists()){
          this.setState({
             followCount: snap.numChildren()
          })
       }
    })
 }

 getFollowingCount(id){
    this.followRef.child(id).child('following').on('value', snap=>{
       if(snap.exists()){
          this.setState({
             followingCount: snap.numChildren()
          })
       }
    })
 }


 getFollowingUserData(id){
    //one dimensional operation  Likes to Users
     app.database().ref('Follow').child(id).child('following').on('value', snap => {
          var values = snap.val() || {};
          const userIds = Object.keys(values);
         
          const promises = userIds.map(
            uid => app.database().ref(`/Users/${uid}`).once('value')
          );
          
          Promise.all(promises).then(results => {
            results.forEach(result => {
              values = result.val();
              //console.log(values)
              
             this.state.following.push(values)
           
            });
            
          });
           
        });
 }


getFollowersUserData(id){
    //one dimensional operation  Likes to Users
     app.database().ref('Follow').child(id).child('followers').on('value', snap => {
          var values = snap.val() || {};
          const userIds = Object.keys(values);
         
          const promises = userIds.map(
            uid => app.database().ref(`/Users/${uid}`).once('value')
          );
          
          Promise.all(promises).then(results => {
            results.forEach(result => {
              values = result.val();
              //console.log(values)
              
             this.state.followers.push(values)
            
            });
            
          });
           
        });
 }


componentWillMount(){

  app.auth().onAuthStateChanged((user)=> {
      if(user){
     
          this.setState({
              currentUserId: user.uid
               })
              var id = this.props.match.params.id
               this.getCurrentUser(user.uid)
               this.getFollowersUserData(user.uid)
               this.getFollowingUserData(user.uid)
               this.getFollowCount(user.uid)
               this.getFollowingCount(user.uid)
               const previousPostList = this.state.postList
 
               var postRef = app.database().ref('Post').child(id).child('post')
               var userRef = app.database().ref('Users')
       
               postRef.on('child_added', snap=>{
                   if(id === snap.val().userId){
       
                   userRef.child(id).on('value', data=>{
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

      }
     
      
    });

}
render(){
    var Followers = ('Followers' + " " + '(' + this.state.followCount + ')')
    var Following = ('Following' + " " + '(' + this.state.followingCount + ')')
    

  return (
    <div id='profileTabs'>
        

        <Tabs fullWidth  value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="Post"  />
          <Tab label={Followers}/>
          <Tab label={Following}/>
        </Tabs>
    
      <TabPanel value={this.state.value} index={0}>
       <div id='postTab'>

       
      <div id='profilePost'>
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
      </div>
      
    </div>
      </TabPanel>

      <TabPanel value={this.state.value} index={1}>
       <div id='followersTab'>
       {this.state.followers.map((user)=>{
            return(
                <UserInfo
                key={user.userId}
                id={user.userId}
                profileImage={user.profileImage}
                userName={user.userName}
                label={user.label}
                city={user.city}

                />
            )
        })}     
       </div>
                
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
          <div id='followingTab'>
          {this.state.following.map((user)=>{
            return(
                <UserInfo
                key={user.userId}
                id={user.userId}
                profileImage={user.profileImage}
                userName={user.userName}
                label={user.label}
                city={user.city}

                />
            )
        })}   
          </div>
              
      </TabPanel>


      <Dialog
                        open={this.state.deletedPostOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
             {this.state.valid != false ? (<div><DialogTitle id="alert-dialog-title">{"Deleted Post"}</DialogTitle>
              <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    This post has been permanently removed.
                </DialogContentText>
               </DialogContent></div>)
               :(<div><DialogTitle id="alert-dialog-title">{"Invalid Input."}</DialogTitle>
               <DialogContent>
               
                </DialogContent></div>)}
              <DialogActions>
                <Button onClick={this.handleClose} 
                    color="primary" autoFocus>
                    Close
                </Button>
               </DialogActions>
            </Dialog>
    </div>
  );
 }
}

export default withRouter(UserProfileTabs)