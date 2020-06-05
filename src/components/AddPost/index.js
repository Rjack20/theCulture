import React, {useState, useRef} from 'react';
import app from '../../base'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './style.css'

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

export default function AddPost(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  var [imageUri, setImageUri] = useState('')
  var [imageUrl, setImageUrl] = useState('')
  var [audioUri, setAudioUri] = useState('')
  var [audioUrl, setAudioUrl] = useState('')
  var [description, setDescription] = useState('')
  var [text, setText] = useState('')
  var [coverArtUri, setCoverUri] = useState('')
  var [coverArt, setCoverArt] = useState('')
  var [title, setTitle] = useState('')
  var [artist, setArtist] = useState('')
  var [album, setAlbum] = useState('')
  var [mixtape, setMixtape] = useState('')
  var [audioProgress, setAudioProgress] = useState(0)
  var [imageProgress, setImageProgress] = useState(0)

 const  noInputToast =()=>{
        toast("Can't create an empty post.", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    const albumandMixtape =()=>{
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
    

    const noArtistToast =()=>{
        toast("Missing a artist name", {
            className: 'custom-toast',
            draggable: true,
            position: toast.POSITION.BOTTOM_CENTER
        })
    }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserInput = (e) =>{
    if(e.target.name === 'photo' && e.target.files[0]){
        setImageUri(imageUri = e.target.files[0])
    
        const uploadTask = app.storage().ref(`photo post/${imageUri.name}`).put(imageUri);
        uploadTask.on('state_changed', 
            (snapshot)=>{
                setImageProgress(imageProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            }, (error)=>{
                //error
                console.log(error)
            },(()=>{
                app.storage().ref('photo post').child(imageUri.name).getDownloadURL()
                .then(url =>{
                 setImageUrl(imageUrl = url)
             })
          })
        )
    }
    if(e.target.name === 'audio' && e.target.files[0]){
        setAudioUri(audioUri = e.target.files[0])
    
        const uploadTask = app.storage().ref(`tracks/${audioUri.name}`).put(audioUri);
        uploadTask.on('state_changed', 
            (snapshot)=>{
                setAudioProgress(audioProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            }, (error)=>{
                //error
                console.log(error)
            },(()=>{
                app.storage().ref('tracks').child(audioUri.name).getDownloadURL()
                .then(url =>{
                 setAudioUrl(audioUrl = url)
             })
          })
        )
    }
    if(e.target.name === 'coverArt' && e.target.files[0]){
        setCoverUri(coverArtUri = e.target.files[0])
    
        const uploadTask = app.storage().ref(`cover art/${coverArtUri.name}`).put(coverArtUri);
        uploadTask.on('state_changed', 
            (snapshot)=>{
                setImageProgress(imageProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            }, (error)=>{
                //error
                console.log(error)
            },(()=>{
                app.storage().ref('photo post').child(coverArtUri.name).getDownloadURL()
                .then(url =>{
                 setCoverArt(coverArt = url)
             })
          })
        )
    }
    if(e.target.name === 'text'){
        setText(text = e.target.value)
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


  const post =()=>{
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
      if(text){
          var postRef = app.database().ref('Post').child(id).child('post')
          let post = {}
        post['userId'] = id;
        post['text'] = text;
        post['description'] = description;
        post['photo'] = imageUrl;
        post['audio'] = audioUrl;
        post['coverArt'] = coverArt;
        post['title'] = title;
        post['artist'] = artist;
        post['album'] = album;
        post['mixtape'] = mixtape;
        post['trackId'] = '';

        postRef.push(post)
        setOpen(open = false)
      }

      if(audioUrl){
        var postRef = app.database().ref('Post').child(id).child('post')
        let post = {}
      post['userId'] = id;
      post['text'] = text;
      post['description'] = description;
      post['photo'] = imageUrl;
      post['audio'] = audioUrl;
      post['coverArt'] = coverArt;
      post['title'] = title;
      post['artist'] = artist;
      post['album'] = album;
      post['mixtape'] = mixtape;
    

      postRef.push(post)
      setOpen(open = false)
    }
    if(imageUrl){
        var postRef = app.database().ref('Post').child(id).child('post')
        let post = {}
      post['userId'] = id;
      post['text'] = text;
      post['description'] = description;
      post['photo'] = imageUrl;
      post['audio'] = audioUrl;
      post['coverArt'] = coverArt;
      post['title'] = title;
      post['artist'] = artist;
      post['album'] = album;
      post['mixtape'] = mixtape;
    

      postRef.push(post)
      
    }
  }

  return (
    <div>
        <>
        <ToastContainer/>
        </>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Create a Post"}</DialogTitle>
        <DialogContent>
        
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Text"/>
          <Tab label="Photo/Video"/>
          <Tab label="Audio"  />
        </Tabs>
      <TabPanel value={value} index={0}>
      <div>
        <TextField onChange={handleUserInput} id="standard-textarea" label="Speak your mind..." name='text' inputProps={{maxLength: 255,}} multiline/>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div id='uploadPV'>
            <div id='photo'>
                {imageUrl ? (<img src={imageUrl} alt='upload'/>):(<img src={require('../../assets/noimage.png')} alt='upload'/>)}
            </div>
            <div id='file'>
            <input type="file" name='photo' accept="image/*" onChange={handleUserInput}/>
            <progress value={imageProgress}  max='100'></progress>
            </div>
            {imageProgress === 100 ? (<p>Picture loaded</p>): (<p>No Picture loaded</p>)}
            <div>
                <TextField id="standard-textarea" label="Description" name='description'inputProps={{maxLength: 255,}} multiline/>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
        <p>Choose Audio File</p>
            <div id='file'>
            <input type="file" name='audio' accept="audio/*" onChange={handleUserInput}/>
            <progress value={audioProgress}  max='100'></progress>
            </div>
               {audioProgress === 100 ? (<p>Track loaded</p>): (<p>No track loaded</p>)}
            <div id='uploadCoverArt'>
                {audioUrl ? (<img src={audioUrl} alt='upload'/>):(<img src={require('../../assets/noimage.png')} alt='upload'/>)}
            </div>
            <p>Cover Art</p>
            <div id='file'>
            <input type="file" name='coverArt' accept="image/*" onChange={handleUserInput}/>
            <progress value={imageProgress}  max='100'></progress>
            </div>
            {imageProgress === 100 ? (<p>Cover Art loaded</p>): (<p>No Cover Art loaded</p>)}
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 17, }} name='artist' label="Artist" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 17, }} name='title' label="Song Title" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 25, }} name='album' label="Song Album" />
            </div>
            <div>
            <TextField id="standard-basic" onChange={handleUserInput} inputProps={{ maxLength: 25, }} name='mixtape' label="Song Mixtape" />
            </div>
             <div>
                <TextField id="standard-textarea" onChange={handleUserInput} inputProps={{ maxLength: 255, }} label="Description" name='description' multiline />
            </div>
        </div>
      </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={post} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

