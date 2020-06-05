import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import app from '../../base'
import './style.css'
import UserInfo from '../UserInfo';
import { withRouter } from 'react-router';



 class LikesPopup extends Component {
    constructor(props){
        super(props)
        this.getLikeUserData = this.getLikeUserData.bind(this)
        this.likeRef = app.database().ref('Likes')

        this.state ={
            likeCount: null,
            likedUsers: [],
            likes: []
        }
    }

    

   
     getLikeUserData(id){
        //one dimensional operation  Likes to Users
         app.database().ref(`/Likes/${id}`).on('value', snap => {
              var values = snap.val() || {};
              const userIds = Object.keys(values);
             
              const promises = userIds.map(
                uid => app.database().ref(`/Users/${uid}`).once('value')
              );
              
              Promise.all(promises).then(results => {
                results.forEach(result => {
                  values = result.val();
                  //console.log(values)
                  
                 this.state.likedUsers.push(values)
                
                });
                
              });
               
            });
     }
    
componentDidMount(){
 this.getLikeUserData(this.props.id)
 
  
}

render(){


  return (
    <Dialog  aria-labelledby="simple-dialog-title" open={this.props.open}>
        <div id='likesPopup'>
            <div onClick={()=>{
                this.props.close()
            }} id='closeLikesPopup'>
                close
            </div>
            <div id='likesPopupHeader'>
                <h5>Likes</h5>
                <hr/>
            </div>
            {this.state.likedUsers ? this.state.likedUsers.map((user)=>{
                return(
                    <UserInfo
                    key={user.userId}
                    id={user.userId}
                    userName={user.userName}
                    label={user.label}
                    city={user.city}
                    />
                )
            }): null}
            
            
        </div>
    </Dialog>
  );
}
}

export default withRouter(LikesPopup)