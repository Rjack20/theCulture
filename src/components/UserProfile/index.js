import React, {useState, useEffect, Component } from 'react'
import {Grid} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import Media from 'react-media'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import app from '../../base'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'

import './style.css'
import Track from '../Track';
import UserProfileTabs from '../UserProfileTabs';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }




export default function UserProfile (props) {
    var [paramsId, setParamsId] = useState(null)
    var [currentUserId, setCurrentUserId] = useState(null)
    var [openAddPost, setOpen] = useState(false)

    
    var [text, setText] = useState('')
    var [description, setDescription] = useState('')
    var [artist, setArtist] = useState('')
    var [title, setTitle] = useState('')
    var [album, setAlbum] = useState('')
    var [mixtape, setMixtape] = useState('')
    var [imageUrl, setImageUrl] = useState('')
    var [imageUri, setImageUri] = useState('')
    var [videoUrl, setVideoUrl] = useState('')
    var [videoUri, setVideoUri] = useState('')
    var [audioUrl, setAudioUrl] = useState('')
    var [audioUri, setAudioUri] = useState('')
    var [coverArt, setCoverArt] = useState('')
    var [coverArtUri, setCoverArtUri] = useState('')
    var [imageProgress, setImageProgress] = useState(0)
    var [videoProgress, setVideoProgress] = useState(0)
    var [audioProgress, setAudioProgress] = useState(0)
    

    const [user, setUser] = useState({})
    var [userRank, setUserRank] = useState('')
    var [tracks, setTracks] = useState([])
   
    var [finalCityList, setFinalCityList] = useState([])
    var [cityList, setFinalCityList] = useState([])
    

    var [sortedTitles, setSortedTitles] = useState([])
    var [sortTitle, setSortTitle] = useState(false)
    var [sortedTitlesPlaylist, setSortedTitlesPlaylist] = useState([])
    var [sortTitlePlaylist, setSortTitlePlaylist] = useState(false)

    var [sortedPlaylist, setSortedPlaylist] = useState(false)
    var [playlist, setPlayList] = useState([])
   
   
    var [sortedAlbumsPlaylist, setSortedAlbumsPlaylist] = useState([])
    var [sortedAlbums, setSortedAlbums] = useState([])
    var [sortAlbums, setSortAlbums] = useState(false)
    var [sortAlbumsPlaylist, setSortAlbumsPlaylist] = useState(false)
    
    var [sorted, setSorted] = useState(false)
    var [deletedPostOpen, setDeletedPostOpen] = useState(false)
    var [trackDeleted, setTrackDeleted] = useState(false)
    var [value, setValue] = useState(0)
    var [postLiked, setPostLiked] = useState(false)
    
    
    


const noInputToast =()=>{
        toast("Can't create an empty post.", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    
 const    albumandMixtape =()=>{
        toast("Error: Album and Mixtape cant both have values", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

     const noTitle =()=>{
        toast("Title must be filled", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    
   const  videoAndPhotoToastError =()=>{
        toast("Error: Cant load image and video at the same time", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    
    
     const noArtistToast =()=>{
        toast("Missing a artist name", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    
    const addPost =()=>{
        var id = app.auth().currentUser.uid
        if(text === '' && description === '' && imageUrl === '' && coverArt === '' && audioUrl === '' && artist === '' && title === '' && album === '' && mixtape === ''){
            noInputToast()
           return
          }
          if(audioUrl && !artist){
            noArtistToast()
           return
          }
          if(album && mixtape){
              albumandMixtape()
              return
          }
    
          if(audioUrl && !title){
              noTitle()
              return
          }
          if(imageUrl && videoUrl){
            videoAndPhotoToastError()
            return
        }



          if(text){
            var postRef = app.database().ref('Post').child(id).child('post')
            let post = {}
            post['userId'] = id;
            post['text'] = text;
            post['description'] = description;
            post['photo'] = imageUrl;
            post['audio'] = audioUrl;
            post['video'] = videoUrl;
            post['coverArt'] = coverArt;
            post['title'] = title;
            post['artist'] = artist;
            post['album'] = album;
            post['mixtape'] = mixtape;
            post['timePosted'] = Date.now();
  
          postRef.push(post).then(()=>{

            setImageUri(null)
            setImageUrl(null)
            setAudioUri(null)
            setAudioUrl(null)
            setPostLiked(false)
            setVideoUri(null)
            setVideoUrl(null)
            setDescription(null)
            setText(null)
            setImageUrl(null)
            setCoverArtUri(null)
            setCoverArt(null)
            setTitle(null)
            setArtist(null)
            setAlbum(null)
            setMixtape(null)
            setImageProgress(0)
            setAudioProgress(0)
       
          setOpen(openAddPost = false)


          })
        
          }
          if(audioUrl){
            var postRef = app.database().ref('Post').child(id).child('post')
            let post = {}
            post['userId'] = id;
            post['text'] = text;
            post['description'] = description;
            post['photo'] = imageUrl;
            post['audio'] = audioUrl;
            post['video'] = videoUrl;
            post['coverArt'] = coverArt;
            post['title'] = title;
            post['artist'] = artist;
            post['album'] = album;
            post['mixtape'] = mixtape;
            post['timePosted'] = Date.now();
        
    
          postRef.push(post).then(()=>{
            setImageUri(null)
            setImageUrl(null)
            setAudioUri(null)
            setAudioUrl(null)
            setPostLiked(false)
            setVideoUri(null)
            setVideoUrl(null)
            setDescription(null)
            setText(null)
            setImageUrl(null)
            setCoverArtUri(null)
            setCoverArt(null)
            setTitle(null)
            setArtist(null)
            setAlbum(null)
            setMixtape(null)
            setImageProgress(0)
            setAudioProgress(0)
       
          setOpen(openAddPost = false)

          })
        }
        if(videoUrl){
            var postRef = app.database().ref('Post').child(id).child('post')
            let post = {}
          post['userId'] = id;
          post['text'] = text;
          post['description'] = description;
          post['photo'] = imageUrl;
          post['audio'] = audioUrl;
          post['video'] = videoUrl;
          post['coverArt'] = coverArt;
          post['title'] = title;
          post['artist'] = artist;
          post['album'] = album;
          post['mixtape'] = mixtape;
          post['timePosted'] = Date.now();
        
    
          postRef.push(post).then(()=>{
              setImageUri(null)
              setImageUrl(null)
              setAudioUri(null)
              setAudioUrl(null)
              setPostLiked(false)
              setVideoUri(null)
              setVideoUrl(null)
              setDescription(null)
              setText(null)
              setImageUrl(null)
              setCoverArtUri(null)
              setCoverArt(null)
              setTitle(null)
              setArtist(null)
              setAlbum(null)
              setMixtape(null)
              setImageProgress(0)
              setAudioProgress(0)
         
            setOpen(openAddPost = false)
     })
        }
        if(imageUrl){
            var postRef = app.database().ref('Post').child(id).child('post')
            let post = {}
            post['userId'] = id;
            post['text'] = text;
            post['description'] = description;
            post['photo'] = imageUrl;
            post['audio'] = audioUrl;
            post['video'] = videoUrl;
            post['coverArt'] = coverArt;
            post['title'] = title;
            post['artist'] = artist;
            post['album'] = album;
            post['mixtape'] = mixtape;
            post['timePosted'] = Date.now();
        
    
          postRef.push(post).then(()=>{
              setImageUri(null)
              setImageUrl(null)
              setAudioUri(null)
              setAudioUrl(null)
              setPostLiked(false)
              setVideoUri(null)
              setVideoUrl(null)
              setDescription(null)
              setText(null)
              setImageUrl(null)
              setCoverArtUri(null)
              setCoverArt(null)
              setTitle(null)
              setArtist(null)
              setAlbum(null)
              setMixtape(null)
              setImageProgress(0)
              setAudioProgress(0)
         
            setOpen(openAddPost = false)
       })
          
        }

      }


   
  const openCollection =(album)=>{

        if(!openAddPost){
            setOpen(openAddPost = true)
           
        }else{
            setOpen(openAddPost = false)
            
        }
        
    }
     //track list
    const removeTrack = (postId) => {
        var id = app.auth().currentUser.uid
        var postRef = app.database().ref('Post')
        postRef.child(id).child('post').child(postId).remove()
        setDeletedPostOpen(deletedPostOpen = true)
       
    }
       //track list
const removeSong = (postId) => {
           
        var id = app.auth().currentUser.uid
        var playlistRef = app.database().ref('Playlist')
        playlistRef.child(id).child('playlist').child(postId).remove()
        setDeletedPostOpen(deletedPostOpen = true)
       
}



    const handleChange = (e) => {

        if(e.target.value === null){

            setSorted(sorted = false)
            
        }
        
        if(e.target.value === 'Album'){
            setSorted(sorted = true)
           

        var sortedAlbums =  tracks.sort((a,b)=>{
                if(a.album > b.album){
                    return 1
                } else {
                    return -1
                }
            })
            setSortedAlbums(sortedAlbums = sortedAlbums)
            setSortAlbums(sortAlbums = true)
        }

        if(e.target.value === 'Title'){
            setSorted(sorted = true)
           
            var sortedTitles =  tracks.sort((a,b)=>{
                if(a.title > b.title){
                    return 1
                } else {
                    return -1
                }
            })
            setSortedTitles(sortedTitles = sortedTitles)
            setSortTitle(sortTitle = true)
            
        }
        if(e.target.value === 'Album' && sortTitle === true){

            setSorted(sorted = true)
            
            var sortedAlbums =  tracks.sort((a,b)=>{
                if(a.album > b.album){
                    return 1
                } else {
                    return -1
                }
            })

            setSortedAlbums(sortedAlbums = sortedAlbums)
            setSortAlbums(sortAlbums = true)
            setSortTitle(sortTitle = false)
           
        }
        if(e.target.value === 'Title' && sortAlbums === true){
            setSorted(sorted = true)
            
            var sortedTitles =  tracks.sort((a,b)=>{
                if(a.title > b.title){
                    return 1
                } else {
                    return -1
                }
            })
            setSortedTitles(sortedTitles = sortedTitles)
            setSortTitle(sortTitle = true)
            setSortAlbums(sortAlbums = false)  
      }
    }

    const handlePlaylistChange = (e) => {

        if(e.target.value === null){
            setSortedPlaylist(sortedPlaylist = false)
           
        }
        
        if(e.target.value === 'Album'){

            setSortedPlaylist(sortedPlaylist = true)

        var sortedAlbumsPlaylist =  playlist.sort((a,b)=>{
                if(a.album > b.album){
                    return 1
                } else {
                    return -1
                }
            })

            setSortedAlbumsPlaylist(sortedAlbumsPlaylist = sortedAlbumsPlaylist)
            setSortAlbumsPlaylist(sortAlbumsPlaylist = true)
           
        }
        if(e.target.value === 'Title'){

            setSortedPlaylist(sortedPlaylist = true)
           
            var sortedTitlesPlaylist =  playlist.sort((a,b)=>{
                if(a.title > b.title){
                    return 1
                } else {
                    return -1
                }
            })

            setSortedTitlesPlaylist(sortedTitlesPlaylist = sortedTitlesPlaylist)
            setSortTitlePlaylist(sortTitlePlaylist = true)
           
        }
        if(e.target.value === 'Album' && sortTitlePlaylist === true){
            setSortedPlaylist(sortedPlaylist = true)
  
            var sortedAlbumsPlaylist =  playlist.sort((a,b)=>{
                if(a.album > b.album){
                    return 1
                } else {
                    return -1
                }
            })
            setSortedAlbumsPlaylist( sortedAlbumsPlaylist = sortedAlbumsPlaylist)
            setSortAlbumsPlaylist(sortedAlbumsPlaylist = true)
            setSortTitlePlaylist(sortTitlePlaylist = false)
            
        }
        if(e.target.value === 'Title' && sortAlbumsPlaylist === true){
            setSortedPlaylist(sortedPlaylist = true)
        
            var sortedTitlesPlaylist =  playlist.sort((a,b)=>{
                if(a.title > b.title){
                    return 1
                } else {
                    return -1
                }
            })
            setSortedTitlesPlaylist(sortedTitlesPlaylist = sortedTitlesPlaylist)
            setSortTitlePlaylist(sortTitlePlaylist = true)
            setSortAlbumsPlaylist(sortAlbumsPlaylist = false)
            
        }
    }

    const handleTabsChange = (event, newValue) => {
        setValue(value = newValue)
       

     };

    const handleUserInput =(e)=>{
        if(e.target.name === 'photo' && e.target.files[0]){
            setImageUri(imageUri = e.target.files[0])
         
            
            
        
            const uploadTask = app.storage().ref(`photo post/${imageUri.name}`).put(imageUri);
            uploadTask.on('state_changed', 
                (error)=>{
                   //error
                   console.log(error)
                    
                }, (snapshot)=>{
                  // setImageProgress(imageProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  
                },(()=>{
                    app.storage().ref('photo post').child(this.state.imageUri.name).getDownloadURL()
                    .then(url =>{

                        setImageUrl(imageUrl = url)
                      
                 })
              })
            )
        }
        if(e.target.name === 'video' && e.target.files[0]){
            setVideoUri(videoUri =  e.target.files[0])
           
        
            const uploadTask = app.storage().ref(`video post/${videoUri.name}`).put(videoUri);
            uploadTask.on('state_changed', 
                (snapshot)=>{
                    //setVideoProgress(videoProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                     
                }, (error)=>{
                    //error
                    console.log(error)
                },(()=>{
                    app.storage().ref('video post').child(videoUri.name).getDownloadURL()
                    .then(url =>{

                        setVideoUrl(videoUrl = url)
                     
                 })
              })
            )
        }
        if(e.target.name === 'audio' && e.target.files[0]){
            setAudioUri(audioUri = e.target.files[0])
         
           
            const uploadTask = app.storage().ref(`tracks/${audioUri.name}`).put(audioUri);
            uploadTask.on('state_changed', 
                (error)=>{
                  
                   
                     //error
                     console.log(error)


                }, (snapshot)=>{
                    var percent = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    //setAudioProgress(audioProgress = percent )
                    

                },(()=>{
                    app.storage().ref('tracks').child(audioUri.name).getDownloadURL()
                    .then(url =>{
                        setAudioUrl(audioUrl = url)
                     
                 })
              })
            )
        }
        if(e.target.name === 'coverArt' && e.target.files[0]){

            setCoverArtUri(coverArtUri = e.target.files[0])
           
            const uploadTask = app.storage().ref(`cover art/${coverArtUri.name}`).put(coverArtUri);
            uploadTask.on('state_changed', 
                (error)=>{

                    //error
                    console.log(error)
                   
                }, (snapshot)=>{
                   // setImageProgress(imageProgress =  Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                   
                },(()=>{
                    app.storage().ref('photo post').child(coverArtUri.name).getDownloadURL()
                    .then(url =>{

                        setCoverArt(coverArt = url)
                      
                 })
              })
            )
        }
        if(e.target.name === 'text'){

            setText(text =  e.target.value)
         
        }
        if(e.target.name === 'description'){

            setDescription(description = e.target.value)
            
        }
        if(e.target.name === 'artist'){
            setArtist(artist = e.target.value)
           
        }

        if(e.target.name === 'title'){

            setTitle(title = e.target.value)
            
        }
        if(e.target.name === 'album'){

            setAlbum(album = e.target.value)
        }
        if(e.target.name === 'mixtape'){
            setMixtape(mixtape = e.target.value)
            
        }
        
       
      };



//open add post 
   const  handleClick =()=>{

    setOpen(openAddPost = true)
        
      }
//close add post
    const handleClose =()=>{

        setOpen(openAddPost = false)
        setDeletedPostOpen(deletedPostOpen = false)
        setTrackDeleted(trackDeleted = false)
       
    }
//get userprofile audio post
 const getUserAudioPost =(id)=>{
    const previousTracks = tracks
    var postRef = app.database().ref('Post')
    postRef.child(id).child('post').on('child_added', snap=>{
        if(snap.val().audio){
            previousTracks.push({
                id: snap.key,
                userId: snap.val().userId,
                title: snap.val().title,
                album: snap.val().album,
                mixtape: snap.val().mixtape,
                artist: snap.val().artist,
                coverArt: snap.val().coverArt,
                audio: snap.val().audio
            })
            setTracks(tracks = previousTracks)
            
        }
      
    })


    postRef.child(id).child('post').on('child_removed', snap=>{
        for(var i=0; i < previousTracks.length; i++){
            if(previousTracks[i].id === snap.key){
              previousTracks.splice(i, 1);
            }
          }
    
          setTracks(tracks = previousTracks)
    })
    
 }

 //get playlist post
const  getUserPlaylist =(id)=>{
    const previousPlaylist = playlist
     var playlistRef = app.database().ref('Playlist')
    playlistRef.child(id).child('playlist').on('child_added', snap=>{
        if(snap.val().audio){
            previousPlaylist.push({
                id: snap.key,
                userId: snap.val().userId,
                title: snap.val().title,
                album: snap.val().album,
                mixtape: snap.val().mixtape,
                artist: snap.val().artist,
                coverArt: snap.val().coverArt,
                audio: snap.val().audio
            })

            setPlayList(previousPlaylist)
            
        }
      
    })


      playlistRef.child(id).child('playlist').on('child_removed', snap=>{
        for(var i=0; i < previousPlaylist.length; i++){
            if(previousPlaylist[i].id === snap.key){
              previousPlaylist.splice(i, 1);
            }
          }
    
          setPlayList(playlist = previousPlaylist)
    })
    
 }

 const checkRankStatus=(city, id)=>{
    //this.cityRef.child(this.state.city)
    var cityRef = app.database().ref('CityUsers')
    cityRef.child(city).on('value', snap => {
        var values = snap.val() || {};
        const userIds = Object.keys(values);
       
        const promises = userIds.map(
          uid => app.database().ref(`/Users/${uid}`).once('value')
        );
        
        Promise.all(promises).then(results => {
          results.forEach(result => {
            values = result.val();
    
            
          cityList.push(values)
          
          });
          function sortRatings(a,b){
              let result = 0
    
              let dataA = a.rating
              let dataB = b.rating
    
              dataA > dataB ? result = 1 : result = -1
              return result
          }
         
         var finalList = cityList.sort(sortRatings).reverse().slice(0, 4).map((i)=>{ return i})
         
         setFinalCityList(finalCityList = finalList)
         
         
         
          //get index
         var userRank = getIndex(id)
          setUserRank(userRank)
       
        });
         
      })
 }

 const getIndex =(id)=>{
     var index = finalCityList.findIndex(x => x.userId === id ) 
     
     switch(index) {
        case 0:
          return <p>#1</p>
          break;
        case 1:
            return <p>#2</p>
          break;
          case 2:
            return <p>#3</p>
          break;
          case 3:
            return <p>#4</p>
          break;
          case 4:
            return <p>#5</p>
          break;
          case 5:
            return <p>#6</p>
          break;
          case 6:
            return <p>#7</p>
          break;
          case 7:
            return <p>#8</p>
          break;
          case 8:
            return <p>#9</p>
          break;
          case 9:
            return <p>#10</p>
          break;
        default:
         return null
      }
 }
 

 useEffect(()=>{

    app.auth().onAuthStateChanged((user)=>{
        if(user){
        
        setCurrentUserId(currentUserId = user.uid)
        
        setParamsId(paramsId = props.match.params.id)
        
        
        getUserAudioPost(paramsId)
        getUserPlaylist(paramsId)
        var userRef = app.database().ref('Users')
        userRef.child(paramsId).on('value', snap=>{

        setUser({
                name: snap.val().userName,
                city: snap.val().city,
                profileImage: snap.val().profileImage,
                label: snap.val().label
                
        })
          
            checkRankStatus(snap.val().city, paramsId)
            
        })
        
        }else{

        }
    })  
   
 }, [])


        
    
    
        
        return (
            <div id='userProfile'>

                <>
                 <ToastContainer/>
                </>

                <Grid 
                container 
                spacing={4}
                >

               <Grid item  xs={12} md={3}>

                        <div  id='user-img'>
                         {user.profileImage ? (<img src={user.profileImage}/> ):(<img src={require('../../assets/noimage.png')}/> )} 
                        </div>
                    

                        <div id='user-profile-name'>
                           <div  id='userProfileName'><p>{user.name}</p></div> 
                            <span>{user.city}</span>
                        {userRank ? (<div id='userProfileRank'> <span>{userRank}</span></div>):(null)}   
                        {paramsId === currentUserId ? 
                        ( <Fab onClick={handleClick} color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                         ):(null)}

                        {paramsId === currentUserId ? 
                        (<div id='editProfileBtn'>
                        <button onClick={()=>{
                            props.history.push('/edit/'+ currentUserId)
                        }}>Edit Profile</button>
                    </div>)
                         :
                         (null)}
                        
                           
                        </div> 
                        
                    </Grid>
                    
                    <Grid item xs={12}md={8}>
                        <div id='media-field'>      
                        {user.label === 'Artist' || user.label === 'Producer' ?
                        (<div>
                             <p>Music Library</p>
                        
                        <input onChange={handleChange}  type="text" id='sort'  name='type' placeholder="Sort Tracks By:" className="sel1" list="sort-by"/>
                        <datalist id="sort-by">
                            <option value="Title"></option>
                            <option value="Album"></option>
                        </datalist>

                        <div id='all-tracks'>
                       
                        {sortAlbums ? 
                        sortedAlbums.map((track)=>{
                            return(



                                <Track
                                key={track.id}
                                id={track.id}
                                userId={track.userId}
                                title={track.title} 
                                artist={track.artist}
                                album={track.album}
                                coverArt={track.coverArt}
                                audio={track.audio}
                                removeSong={removeSong}
                                removeTrack={removeTrack}
                                />
                            )

                        }): null}


                        {sortTitle ? 
                        sortedTitles.map((track)=>{
                            return(



                                <Track
                                key={track.id}
                                id={track.id}
                                userId={track.userId}
                                title={track.title} 
                                artist={track.artist}
                                album={track.album}
                                coverArt={track.coverArt}
                                audio={track.audio}
                                removeSong={removeSong}
                                removeTrack={removeTrack}
                                />
                            )

                        }): null}


                        {!sorted ? 
                        tracks.map((track)=>{



                            return(
                                <Track
                                key={track.id}
                                id={track.id}
                                userId={track.userId}
                                title={track.title} 
                                artist={track.artist}
                                album={track.album}
                                coverArt={track.coverArt}
                                audio={track.audio}
                                removeSong={removeSong}
                                removeTrack={removeTrack}
                                />
                            )

                        }): null}         
                      </div>
                        </div>)
                        :
                        (null)}
                       

                      <p>Playlist</p>

                      <input onChange={handlePlaylistChange}  type="text" id='sort'  name='type' placeholder="Sort Playlist By:" className="sel1" list="sort-by"/>
                        <datalist id="sort-by">
                            <option value="Title"></option>
                            <option value="Album"></option>
                        </datalist>

                      <div id='playList'>
                        {sortAlbumsPlaylist ? 
                        (sortedAlbumsPlaylist.map((song)=>{
                            return(
                                <Track
                                   key={song.id}
                                   id={song.id}
                                   userId={song.userId}
                                   title={song.title} 
                                   artist={song.artist}
                                   album={song.album}
                                   coverArt={song.coverArt}
                                   audio={song.audio}
                                   removeSong={removeSong}
                                   isPlaylist={true}
                                   playlistUserId={paramsId}
                                />
                            )

                        })):
                        (null)}

                        {sortTitlePlaylist ? 
                        (sortedTitlesPlaylist.map((song)=>{
                            return(
                                <Track
                                   key={song.id}
                                   id={song.id}
                                   userId={song.userId}
                                   title={song.title} 
                                   artist={song.artist}
                                   album={song.album}
                                   coverArt={song.coverArt}
                                   audio={song.audio}
                                   removeSong={removeSong}
                                   isPlaylist={true}
                                   playlistUserId={paramsId}
                                />
                            )

                        })):
                        (null)}
                        {!sortedPlaylist ? 
                        (playlist.map((song)=>{
                            return(
                                <Track
                                   key={song.id}
                                   id={song.id}
                                   userId={song.userId}
                                   title={song.title} 
                                   artist={song.artist}
                                   album={song.album}
                                   coverArt={song.coverArt}
                                   audio={song.audio}
                                   removeSong={removeSong}
                                   isPlaylist={true}
                                   playlistUserId={paramsId}
                                />
                            )

                        })):
                        (null)}

                      </div>


                      <UserProfileTabs/>




                     </div>
                    </Grid>
                </Grid>
                <Dialog
                        open={deletedPostOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
             <div><DialogTitle id="alert-dialog-title">{"Deleted Track"}</DialogTitle>
              <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    This track has been permanently removed.
                </DialogContentText>
               </DialogContent></div>
              <DialogActions>
                <Button onClick={handleClose} 
                    color="primary" autoFocus>
                    Close
                </Button>
               </DialogActions>
            </Dialog>




            <Dialog
        open={openAddPost}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Create a Post"}</DialogTitle>
        <DialogContent>
        
        <Tabs value={value} onChange={handleTabsChange} aria-label="simple tabs example">

          <Tab label="Text"/>
          <Tab label="Photo/Video"/>
          <Tab label="Audio"  />

        </Tabs>

      <TabPanel value={value} index={0}>

      <div>
        <TextField  value={text} onChange={handleUserInput} id="standard-textarea" label="Speak your mind..." name='text' inputProps={{maxLength: 255,}} multiline/>
      </div>


      </TabPanel>
      <TabPanel value={value} index={1}>
      <div id='uploadPV'>
            <div id='photo'>
                {imageUrl ? (<img src={imageUrl} alt='upload'/>):(null)}
            </div>
            <div id='file'>
        <input type="file" name='photo' accept="image/*" onChange={handleUserInput}/>
           
            {/*   <progress value={imageProgress}  max='100'></progress>*/}
            </div>
            
             {/* {imageProgress === 100 ? (<p>Picture loaded</p>): (<p>No Picture loaded</p>)}*/}
            or
            <div id='file'>
              <input type="file" name='video' accept="video/*" onChange={handleUserInput}/>
           
             {/*  <progress value={videoProgress}  max='100'></progress> */}
            
            </div>
            {/* {videoProgress === 100 ? (<p>Video loaded</p>): (<p>No Video loaded</p>)} */}
            <div>
                <TextField onChange={handleUserInput} id="standard-textarea" label="Description" value={description} name='description'inputProps={{maxLength: 255,}} multiline/>
            </div>
        </div>
      </TabPanel>


{user.label === 'Artist' || user.label === 'Producer' ?
(<div>
    <TabPanel value={value} index={2}>
        <div>
        <p>Choose Audio File</p>
            <div id='file'>
            <input type="file"  name='audio' accept="audio/*" onChange={handleUserInput}/>
            
            {/* <progress value={audioProgress} max={100} ></progress> */}

            </div>
            {/*{audioProgress === 100 ? (<p>Track loaded</p>): (<p>No track loaded</p>)} */}
               
            <div id='uploadCoverArt'>
                 {/* {coverArt ? (<img src={coverArt} alt='upload'/>):(<img src={require('../../assets/noimage.png')} alt='upload'/>)} */}
                
            </div>
            <p>Cover Art</p>
            <div id='file'>
                
            <input type="file"  name='coverArt' accept="image/*" onChange={handleUserInput}/>
            
            {/* <progress value={imageProgress}  max='100'></progress> */}
            </div>
           
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 17, }} value={artist} name='artist' label="Artist" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 17, }} value={title} name='title' label="Song Title" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 25, }} value={album} name='album' label="Song Album" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 25, }} value={mixtape} name='mixtape' label="Song Mixtape" />
            </div>
             <div>
                <TextField id="standard-textarea" onChange={handleUserInput} inputProps={{ maxLength: 255, }} value={description} label="Description" name='description' multiline />
            </div>
        </div>
      </TabPanel>
</div>)
:
(<TabPanel value={value} index={2}>
    <p>Only [Artist] or [Producer] accounts can upload music,
     your account is registered as a [Default User]. However if in the future you wish to change
     your label, beware to only upload music you own or have the legal rights to. Otherwise your account
      will be permentaly deleted.</p>
</TabPanel>)
}
      


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addPost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
            </div>
        )
}
