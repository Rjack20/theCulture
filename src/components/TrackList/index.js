import React, {Component} from 'react'
import './style.css'


export default class TrackList extends Component{
    constructor(props){
        super(props)
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this)
        this.getTime = this.getTime.bind(this)

        this.state = {
            currentSong: null,
            music: 'stopped',
            currentTime: null,
            duration: null
        }
    }


    
        handleRemoveTrack=(id)=>{
            
          this.props.removeTrack(id)

        }


         //get time
        getTime = (time)=>{
        if(!isNaN(time)){
            return(
                Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
            )
        }
    }
        
        componentDidMount() {
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
        <div id='tracklistContainer'>
            <audio ref={ref=>(this.player = ref)}/>
            <div id="trackImg">
                <img src={this.props.coverArt} alt='Track Cover Art'/>
                <div id='trackLabels'> 
                    <p id='trackArtist'>{this.props.artist}</p>
                    <p id='trackTitle'>{this.props.title}</p>
                    <p id='trackAlbum'>{this.props.album}</p>
                </div>
            </div>
            <div id='trackListControls'>
            <div id='play-img'>
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
                    <div id="t-seek-bar">
                        {currentTime} / {duration}
                    </div>
                    <div id='seek-bar'>
                      <div ref={ref=>(this.fillbar = ref)} id="fill"></div>
                      <div id="handle"></div>
                    </div>
               </div>
            </div>
            <div id='closeBtn'>
                <img onClick={()=>{
                   this.handleRemoveTrack(this.props.id)
                }} src={require('../../assets/close_icon.png')} alt=''/>
            </div>
        </div>
    )
  }
}
