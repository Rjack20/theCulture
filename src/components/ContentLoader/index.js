import React, {useState} from 'react'
import app from '../../base'
import './styles.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function ContentLoader({history,props}) {
    const [open, setOpen] = useState(false);
    const [valid, setValid] = useState(false);
    var [blogType, setBlogType] = useState('')
    
    var [imageUri, setImageUri] = useState('');
    var [imageProgress, setImageProgress] = useState(0)

    var [imageUri1, setImageUri1] = useState('');
    var [imageProgress1, setImageProgress1] = useState(0)
    var [imageUri2, setImageUri2] = useState('');
    var [imageProgress2, setImageProgress2] = useState(0)
    var [imageUri3, setImageUri3] = useState('');
    var [imageProgress3, setImageProgress3] = useState(0)
    var [imageUri4, setImageUri4] = useState('');
    var [imageProgress4, setImageProgress4] = useState(0)
    var [imageUri5, setImageUri5] = useState('');
    var [imageProgress5, setImageProgress5] = useState(0)
    var [imageUri6, setImageUri6] = useState('');
    var [imageProgress6, setImageProgress6] = useState(0)
    var [imageUri7, setImageUri7] = useState('');
    var [imageProgress7, setImageProgress7] = useState(0)
    var [imageUri8, setImageUri8] = useState('');
    var [imageProgress8, setImageProgress8] = useState(0)
    var [imageUri9, setImageUri9] = useState('');
    var [imageProgress9, setImageProgress9] = useState(0)
    var [imageUri10, setImageUri10] = useState('');
    var [imageProgress10, setImageProgress10] = useState(0)

    var [content, setContent] = useState({
        type:'',
        artist: '',
        city: '',
        rank: '',
        title: '',
        sub:'',
        body: '',
        coverImage:'',
        time: '',
        youtubeUrl: '',
        listHeaderBody:'',
        entryTitleOne: '',
        coverImage1: '',
        body1: '',
        entryTitleTwo: '',
        coverImage2: '',
        body2: '',
        entryTitleThree: '',
        coverImage3: '',
        body3: '',
        entryTitleFour: '',
        coverImage4: '',
        body4: '',
        entryTitleFive: '',
        coverImage5: '',
        body5: '',
        entryTitleSix: '',
        coverImage6: '',
        body6: '',
        entryTitleSeven: '',
        coverImage7: '',
        body7: '',
        entryTitleEight: '',
        coverImage8: '',
        body8: '',
        entryTitleNine: '',
        coverImage9: '',
        body9: '',
        entryTitleTen: '',
        coverImage10: '',
        body10: ''      
    })

    const handleInput = (e) =>{
        const value = e.target.value
        setContent(content = {
            ...content,
            [e.target.name]: value 
         })

         if(e.target.value === 'Trending-A'){
             setBlogType(blogType = 'Trending-A')
            
         }

         if(e.target.value === 'List'){
            setBlogType(blogType = 'List')
         }

         if(e.target.value === 'Feature'){
            setBlogType(blogType = 'Feature')
         }

        if(e.target.name == 'coverImage' && e.target.files[0]){
            setImageUri( imageUri = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri.name}`).put(imageUri);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress(imageProgress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage1' && e.target.files[0]){
            setImageUri1( imageUri1 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri1.name}`).put(imageUri1);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress(imageProgress1 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri1.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage1: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage2' && e.target.files[0]){
            setImageUri2( imageUri2 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri2.name}`).put(imageUri2);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress(imageProgress2 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri2.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage2: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage3' && e.target.files[0]){
            setImageUri3( imageUri3 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri3.name}`).put(imageUri3);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress3(imageProgress3 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri3.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage3: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage4' && e.target.files[0]){
            setImageUri4( imageUri4 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri4.name}`).put(imageUri4);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress4(imageProgress4 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri4.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage4: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage5' && e.target.files[0]){
            setImageUri5( imageUri5 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri5.name}`).put(imageUri5);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress5(imageProgress5 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri5.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage5: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage6' && e.target.files[0]){
            setImageUri6( imageUri6 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri6.name}`).put(imageUri6);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress6(imageProgress6 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri6.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage6: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage7' && e.target.files[0]){
            setImageUri7( imageUri7 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri7.name}`).put(imageUri7);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress(imageProgress7 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri7.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage7: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage8' && e.target.files[0]){
            setImageUri8( imageUri8 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri8.name}`).put(imageUri8);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress8(imageProgress8 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri8.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage8: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage9' && e.target.files[0]){
            setImageUri9( imageUri9 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri9.name}`).put(imageUri9);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress(imageProgress9 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri9.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage9: url
                     })
                 
                    
                })

            });
        }
        if(e.target.name == 'coverImage10' && e.target.files[0]){
            setImageUri10( imageUri10 = e.target.files[0])
            const uploadTask = app.storage().ref(`content image/${imageUri10.name}`).put(imageUri10);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
                setImageProgress10(imageProgress10 = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                
            }, ()=>{
                //complete
                app.storage().ref('content image').child(imageUri10.name).getDownloadURL()
                .then(url =>{

                    setContent({
                        ...content,
                        coverImage10: url
                     })
                 
                    
                })

            });
        }
  
    }

    const writeContent = (e) =>{
        e.preventDefault()
        if(content.type  === "" ){
          setOpen(true)
          setValid(false)
        }else{
            const now = new Date()
            const blogRef = app.database().ref().child('Blogs')
            blogRef.push().set({
                type: content.type,
                artist: content.artist,
                city: content.city,
                rank: content.rank,
                title: content.title,
                sub: content.sub,
                youtubeUrl: content.youtubeUrl,
                body: content.body,
                coverImage: content.coverImage,
                listHeaderBody: content.listHeaderBody,
                entryTitleOne: content.entryTitleOne,
                coverImage1: content.coverImage1,
                body1: content.body1,
                entryTitleTwo: content.entryTitleTwo,
                coverImage2: content.coverImage2,
                body2: content.body2,
                entryTitleThree: content.entryTitleThree,
                coverImage3: content.coverImage3,
                body3: content.body3,
                entryTitleFour: content.entryTitleFour,
                coverImage4: content.coverImage4,
                body4: content.body4,
                entryTitleFive: content.entryTitleFive,
                coverImage5: content.coverImage5,
                body5: content.body5,
                entryTitleSix: content.entryTitleSix,
                coverImage6: content.coverImage6,
                body6: content.body6,
                entryTitleSeven: content.entryTitleSeven,
                coverImage7: content.coverImage7,
                body7: content.body7,
                entryTitleEight: content.entryTitleEight,
                coverImage8: content.coverImage8,
                body8: content.body8,
                entryTitleNine: content.entryTitleNine,
                coverImage9: content.coverImage9,
                body9: content.body9,
                entryTitleTen: content.entryTitleTen,
                coverImage10: content.coverImage10,
                body10: content.body10,
                
                
                time: now.toDateString()
            }).then(()=>{
                setOpen(true)
                setValid(true)
                
                setContent({
                    type:'',
                    artist: '',
                    city: '',
                    rank: '',
                    title: '',
                    sub:'',
                    body: '',
                    youtubeUrl: '',
                    coverImage:'',
                    time: '',
                    listHeaderBody: '',
                    entryTitleOne: '',
                    coverImage1: '',
                    body1: '',
                    entryTitleTwo: '',
                    coverImage2: '',
                    body2: '',
                    entryTitleThree: '',
                    coverImage3: '',
                    body3: '',
                    entryTitleFour: '',
                    coverImage4: '',
                    body4: '',
                    entryTitleFive: '',
                    coverImage5: '',
                    body5: '',
                    entryTitleSix: '',
                    coverImage6: '',
                    body6: '',
                    entryTitleSeven: '',
                    coverImage7: '',
                    body7: '',
                    entryTitleEight: '',
                    coverImage8: '',
                    body8: '',
                    entryTitleNine: '',
                    coverImage9: '',
                    body9: '',
                    entryTitleTen: '',
                    coverImage10: '',
                    body10: ''   
                })
                document.getElementById("c-title").value = null;
                document.getElementById("c-cover").value = null;
                document.getElementById("content-body").value = null;
                
            })
        }
        
    }

    
    

    return (
        <div className='content-loader-container'>
            <h5>Content Loader</h5>
            <div id='c-type-container'>
            <label>Content Type:</label>
            <br/>
            <input onChange={handleInput} type="text" id='content-choose'  name='type' placeholder="Content Type" className="sel1" list="content-type"/>
               <datalist id="content-type">
                 <option value="Feature"></option>
                 <option value="Trending-A"></option>
                 <option value="List"></option>
               </datalist>
            </div>
            <Dialog
            open={open}
            onClose={()=>{
            setOpen(false)
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
             {valid != false ? (<div><DialogTitle id="alert-dialog-title">{"Upload Complete."}</DialogTitle>
              <DialogContent>
               <DialogContentText id="alert-dialog-description">
                    Blog Posted!
                </DialogContentText>
               </DialogContent></div>)
               :(<div><DialogTitle id="alert-dialog-title">{"Invalid Input."}</DialogTitle>
               <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    All fields must be filled!
                 </DialogContentText>
                </DialogContent></div>)}
              <DialogActions>
                <Button onClick={()=>{
                    setOpen(false)
                }} color="primary" autoFocus>
                    Close
                </Button>
               </DialogActions>
            </Dialog>

            {blogType === 'Trending-A' ? (
            <div>
                <label >Artist</label>
                <br/>
               <input onChange={handleInput} type="text" id='c-title' name='artist' placeholder="Artist"/>
               <br/>
               <label >City</label>
               <br/>
               <input onChange={handleInput} type="text" id='c-title' name='city' placeholder="City"/>
               <br/>
               <label >Rank</label>
               <br/>
               <input onChange={handleInput} type="text" id='c-title' name='rank' placeholder="Rank"/>
               <br/>
               <label >Youtube Url</label>
               <br/>
               <input onChange={handleInput} type="text" id='c-title' name='youtubeUrl' placeholder="Youtube Url"/>
               <br/>
                <label >Cover Image</label>
                <br/>
               <input onChange={handleInput} type="file" id='c-cover' name='coverImage'></input>
               <br/>
               {imageProgress == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress} max='100'> </progress>
               <br/>
                <div className='cover-img-container'>
                {content.coverImage ? (<img id='cover-image' src={content.coverImage} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
               
                <label >Body</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body'/>
                </div>
               </div> ):
               (
                null
               )}
               
             {blogType === 'List' ? 
             (
                <div>
                <label >List Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='title'/>
                <br/>
                <label>Sub Text</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-subtext' name='sub' placeholder="Sub Text"/>
                <br/>
                <label >Cover Image</label>
                <br/>
               <input onChange={handleInput} type="file" id='c-cover' name='coverImage'></input>
               <br/>
               {imageProgress == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress} max='100'> </progress>
               <br/>
                <div className='cover-img-container'>
                {content.coverImage ? (<img id='cover-image' src={content.coverImage} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <br/>
                <label >List Header Body</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='listHeaderBody'/>
                </div>
                <br/>
                <label >Entry 1 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleOne'/>
                <br/>
                <label >Cover Image 1</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage1'></input>
                <br/>
                {imageProgress1 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress1} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage1 ? (<img id='cover-image' src={content.coverImage1} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
               <br/>
                <label >Body 1</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body1'/>
                </div>
                <label >Entry 2 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleTwo'/>
                <br/>
                <label >Cover Image 2</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage2'></input>
                <br/>
                {imageProgress2 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress2} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage2 ? (<img id='cover-image' src={content.coverImage2} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 2</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body2'/>
                </div>
                <label >Entry 3 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleThree'/>
                <br/>
                <label >Cover Image 3</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage3'></input>
                <br/>
                {imageProgress3 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress3} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage3 ? (<img id='cover-image' src={content.coverImage3} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 3</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body3'/>
                </div>
                <label >Entry 4 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleFour'/>
                <br/>
                <label >Cover Image 4</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage4'></input>
                <br/>
                {imageProgress4 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress4} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage4 ? (<img id='cover-image' src={content.coverImage4} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 4</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body4'/>
                </div>
                <label >Entry 5 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleFive'/>
                <br/>
                <label >Cover Image 5</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage5'></input>
                <br/>
                {imageProgress5 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress5} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage5 ? (<img id='cover-image' src={content.coverImage5} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 5</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body5'/>
                </div>
                <label >Entry 6 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleSix'/>
                <br/>
                <label >Cover Image 6</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage6'></input>
                <br/>
                {imageProgress6 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress6} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage6 ? (<img id='cover-image' src={content.coverImage6} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 6</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body6'/>
                </div>
                <label >Entry 7 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleSeven'/>
                <br/>
                <label >Cover Image 7</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage7'></input>
                <br/>
                {imageProgress7 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress7} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage7 ? (<img id='cover-image' src={content.coverImage7} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 7</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body7'/>
                </div>
                <label >Entry 8 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleEight'/>
                <br/>
                <label >Cover Image 8</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage8'></input>
                <br/>
                {imageProgress8 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress8} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage8 ? (<img id='cover-image' src={content.coverImage8} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 8</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body8'/>
                </div>
                <label >Entry 9 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleNine'/>
                <br/>
                <label >Cover Image 9</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage9'></input>
                <br/>
                {imageProgress9 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress9} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage9 ? (<img id='cover-image' src={content.coverImage9} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 9</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body9'/>
                </div>
                <label >Entry 10 Title</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-title' name='entryTitleTen'/>
                <br/>
                <label >Cover Image 10</label>
                <br/>
                <input onChange={handleInput} type="file" id='c-cover' name='coverImage10'></input>
                <br/>
                {imageProgress10 == 100 ? (<p>Complete</p>) : (null)}
               <progress id='image-progress' value={imageProgress10} max='100'> </progress>
               <br/>
               <div className='cover-img-container'>
                {content.coverImage10 ? (<img id='cover-image' src={content.coverImage10} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
                <label >Body 10</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body10'/>
                </div>
                </div>
                
             ) : 
             (
                null
             )}

             {blogType === 'Feature' ? 
             (
                <div> <label >Feature Title</label>
               <br/>
                <input onChange={handleInput} type="text" id='c-title' name='title' placeholder="Title"/>
                <br/>
                <label>Sub Text</label>
                <br/>
                <input onChange={handleInput} type="text" id='c-subtext' name='sub' placeholder="Sub Text"/>
                <br/>
               <label >Youtube Url</label>
               <br/>
               <input onChange={handleInput} type="text" id='c-title' name='youtubeUrl' placeholder="Youtube Url"/>
               <br/>
                <label >Cover Image</label>
                <br/>
               <input onChange={handleInput} type="file" id='c-cover' name='coverImage'></input>
               <br/>
               {imageProgress == 100 ? (<p>Complete</p>) : (null)}
               <br/>
               <progress id='image-progress' value={imageProgress} max='100'> </progress>
                
                <div className='cover-img-container'>
                {content.coverImage ? (<img id='cover-image' src={content.coverImage} alt=""/>) : (<img id='cover_image' src={require('../../assets/noimage.png')} alt=""/>)}
                </div>
            
                <label >Body</label>
                <div id='content-body-container'>
                  <textarea id='content-body' onChange={handleInput} name='body'/>
                </div>
               
             </div>
             )
             :
             (
                null
             )}
               
              
              
               
               <button id='c-submit-btn' onClick={writeContent}>Post</button>
        </div>
    )
}

