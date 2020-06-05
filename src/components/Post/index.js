import React, { Component } from 'react'
import PostDetails from '../../components/PostDetails'
import app from '../../base'

export default class Post extends Component {
    constructor(props){
        super(props)
        this.getPostData = this.getPostData.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.postRef = app.database().ref('Post')
        this.userRef = app.database().ref('Users')
        this.likeRef = app.database().ref('Likes')
        this.postId = this.props.match.params.postId
        

        this.state = {
            userId: '',
            isLiked: false,
            postId: '',
            text: '',
            photo: '',
            audio: '',
            video: '',
            description: '',
            coverArt: '',
            album: '',
            mixtape: '',
            title: '',
            artist: '',
            userName: '',
            city: '',
            label: '',
            profileImage: ''
        }
    }





    getUserInfo(){
        var userId = this.props.match.params.userId
        

          return this.userRef.child(userId).once('value').then((snap)=>{
            this.setState({
                userName: snap.val().userName,
                city: snap.val().city,
                label: snap.val().label,
                profileImage: snap.val().profileImage
            })
          })
        } 

        
getPostData(){
    var userId = this.props.match.params.userId
    var postId =  this.props.match.params.postId
   
   this.postRef.child(userId).child('post').child(postId)
    .once('value').then((snap)=>{
        
             this.setState({
                postId: snap.key,
                userId: snap.val().userId,
                text: snap.val().text,
                photo: snap.val().photo,
                audio: snap.val().audio,
                video: snap.val().video,
                description: snap.val().description,
                coverArt: snap.val().coverArt,
                album: snap.val().album,
                mixtape: snap.val().mixtape,
                title: snap.val().title,
                artist: snap.val().artist
             })
             
    }) 
   }

   componentWillMount(){
    this.getUserInfo()
    this.getPostData()
   


   }



    render() {
        return (
            <div>
                
                {this.state.audio ? 
                ( <PostDetails
                    postId={this.state.postId}
                    userId={this.state.userId}
                    userName={this.state.userName}
                    label={this.state.label}
                    city={this.state.city}
                    rank='rank'
                    text={this.state.text}
                    isLiked={this.state.isLiked}
                    photo={this.state.photo}
                    title={this.state.title}
                    description={this.state.description}
                    video={this.state.video}
                    profileImage={this.state.profileImage}
                    artist={this.state.artist}
                    coverArt={this.state.coverArt}
                    audio={this.state.audio}
                    video={this.state.video}
                    album={this.state.album}
                    mixtape={this.state.mixtape}
                    
                    />)
                :
                (null)}

{this.state.video ? 
                ( <PostDetails
                    postId={this.state.postId}
                    userName={this.state.userName}
                    userId={this.state.userId}
                    label={this.state.label}
                    city={this.state.city}
                    rank='rank'
                    text={this.state.text}
                    isLiked={this.state.isLiked}
                    photo={this.state.photo}
                    title={this.state.title}
                    description={this.state.description}
                    video={this.state.video}
                    profileImage={this.state.profileImage}
                    artist={this.state.artist}
                    coverArt={this.state.coverArt}
                    audio={this.state.audio}
                    video={this.state.video}
                    album={this.state.album}
                    mixtape={this.state.mixtape}
                    
                    />)
                :
                (null)}

{this.state.photo ? 
                ( <PostDetails
                    postId={this.state.postId}
                    userName={this.state.userName}
                    label={this.state.label}
                    city={this.state.city}
                    rank='rank'
                    text={this.state.text}
                    userId={this.state.userId}
                    isLiked={this.state.isLiked}
                    photo={this.state.photo}
                    title={this.state.title}
                    description={this.state.description}
                    video={this.state.video}
                    profileImage={this.state.profileImage}
                    artist={this.state.artist}
                    coverArt={this.state.coverArt}
                    audio={this.state.audio}
                    video={this.state.video}
                    album={this.state.album}
                    mixtape={this.state.mixtape}
                    
                    />)
                :
                (null)}

{this.state.text ? 
                ( <PostDetails
                    postId={this.postId}
                    userId={this.state.userId}
                    userName={this.state.userName}
                    label={this.state.label}
                    city={this.state.city}
                    rank='rank'
                    text={this.state.text}
                    isLiked={this.state.isLiked}
                    photo={this.state.photo}
                    title={this.state.title}
                    description={this.state.description}
                    video={this.state.video}
                    profileImage={this.state.profileImage}
                    artist={this.state.artist}
                    coverArt={this.state.coverArt}
                    audio={this.state.audio}
                    video={this.state.video}
                    album={this.state.album}
                    mixtape={this.state.mixtape}
                    
                    />)
                :
                (null)}
            </div>
        )
    }
}
