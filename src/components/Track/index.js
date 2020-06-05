import React,{Component} from 'react'
import './style.css'
import { withRouter } from 'react-router'
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import {Rating} from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import app from '../../base'


class Track extends Component {
    constructor(props){
        super(props)
        this.getTime = this.getTime.bind(this)
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this)
        this.addToLibray = this.addToLibray.bind(this)
        this.songAddedToPlaylist = this.songAddedToPlaylist.bind(this)
        this.removeFromLibrary = this.removeFromLibrary.bind(this)
        this.add = this.add.bind(this)
        this.getCurrentRating = this.getCurrentRating.bind(this)
        this.checkIfUserRatedThisPost = this.checkIfUserRatedThisPost.bind(this)
        this.checkIfSongInPlaylist = this.checkIfSongInPlaylist.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.postRef = app.database().ref('Post')
        this.playlistRef = app.database().ref('Playlist')
        this.userRef = app.database().ref('Users')
        this.ratingRef = app.database().ref('Rating')
        this.currentUser = app.auth().currentUser.uid

        this.state = {
            ratingValue: null,
            ratingScore: null,
            previousRating: null,
            isRated: false,
            currentUserId: '',
            currentSong: null,
            ratingOpen: true,
            inPlaylist: false,
           
            post: [],
            alreadyInPlaylist: false,
            music: 'stopped',
            currentTime: null,
            duration: null,
            closeClicked: false
        }

    }

checkIfSongInPlaylist(postId, id){
    this.playlistRef.child(this.state.currentUserId).child('playlist').child(this.props.id).on('value', snap =>{
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
            this.ratingRef.child(this.currentUser)
            .child('rating')
            .child(this.props.id)
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
        .child(this.props.id)
        .on('value', snap=>{
        if(snap.exists()){
            this.setState({
                isRated: true
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



   songAlreadyInPlaylist(){
        toast("This song is already in your playlist.", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

     handleRemoveTrack=(id)=>{
            
        this.props.removeTrack(id)
      }

      removeFromLibrary(id){
        this.props.removeSong(id)
       
    }
    
    //get time
    getTime(time){
        if(!isNaN(time)){
            return(
                Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
            )
        }
    }

addToLibray(){
    var currentUid = app.auth().currentUser.uid

    this.postRef.child(this.props.userId).child('post')
    .child(this.props.id).on('value', snap=>{
       
        if(snap.exists()){
            
         this.add(snap.key,snap.val(), currentUid)
        }
        
    })
    
}

add(postId, obj , id){
  
    
 this.playlistRef.child(id).child('playlist').child(postId).set(obj)
.then(()=>{
    this.songAddedToPlaylist()
})
}


 
    componentDidMount() {
        this.checkIfUserRatedThisPost()
        this.getCurrentRating(this.props.userId)

        app.auth().onAuthStateChanged(user =>{
            if(user){
                this.setState({
                    currentUserId: user.uid
                })
                this.checkIfSongInPlaylist()
            }
        })

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

componentWillUnmount() {
    
    this.player.removeEventListener("timeupdate", () => {});
        
        
          
}
      

    render(){
        const currentTime = this.getTime(this.state.currentTime)
        const duration = this.getTime(this.state.duration)
    return (
        <div id='track-container'>
                <>
                 <ToastContainer/>
                </>

             
            <audio ref={ref=>(this.player = ref)}/>
            <div id='track-cover-art'>
                <img src={this.props.coverArt} alt='cover art'/>
              <div  onClick={()=>{
                this.props.history.push('/user/' + this.props.userId)
            }}id='track-info'>
                <p id='info-artist'>{this.props.artist}</p>
                <p id='info-title'>{this.props.title}</p>
                <p id='info-album'>{this.props.album}</p>
              </div>

              

            {this.state.inPlaylist ? (<div onClick={()=>{this.removeFromLibrary(this.props.id)}} id='addToLibrary'>
              <h5>____</h5>
              <p id="tooltiptextAdd">Remove From Your Library</p>
              </div>):(<div onClick={this.addToLibray} id='addToLibrary'>
              <AddIcon fontSize='large'/>
              <span id="tooltiptextAdd">Add To Your Library</span>
              </div>)}
              

            </div>
            <div id='track-controls'>


                <div id='play-icon'>
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
                     
                </div>

                
                <div>
                <div id='time-seekbar'>
                <p>{currentTime} / {duration}</p>
                </div>
                <div id="seek-bar">
                    <div ref={ref=> this.fillbar = ref} id="fill"></div>
                    <div id="handle"></div>
                </div>
                </div>

                <div id='trackRating'>
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

               </div>
            
         
            
            {this.props.isPlaylist ? (null):( this.state.currentUserId === this.props.userId || this.props.playlistUserId === this.state.currentUserId ?
            (<div id='close'>
            <div>
              <img onClick={()=>{this.handleRemoveTrack(this.props.id)}} src={require('../../assets/close_icon.png')} alt=''/>
              <span id="tooltiptext">Delete</span>
            </div>
            
        </div>)
            :
            (null))}
           
            

        </div>
    )

  }
    
}
export default withRouter(Track)