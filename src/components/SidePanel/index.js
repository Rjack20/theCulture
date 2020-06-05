import React,{Component} from 'react'
import './style.css'
import Card from '../../UI/Card'
import TrendingArtist from '../TrendingArtist'
import RecentPost from '../RecentPost'
import app from '../../base'

export default class SidePanel extends Component{
    constructor(props){
        super(props)

    }





    render(){
        return (
        
        <div>
            
           <Card>
           <div  className='side-bottom-container'>
               <div className='cardHeader'>
                   <span>Recent Post</span>
               </div>  
               <div className='recentPosts'>
                   <div className='recentPost'>
            
                   </div>
               </div>
           </div>
           </Card>
        </div>
        )
    }

}
