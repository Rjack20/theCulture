import React, {Component} from 'react'
import Card from '../../UI/Card'
import './style.css'
import SidePanel from '../SidePanel'
import Featured from '../Featured'
import app from '../../base'
import TrendingArtist from '../TrendingArtist'
import RecentPost from '../RecentPost'
import List from '../List'
import {Grid} from '@material-ui/core'


export default class Blogs extends Component {
    constructor(props){
        super(props)

        this.blogRef = app.database().ref().child('Blogs')
        this.currentUser = app.auth().currentUser
        this.removeBlog = this.removeBlog.bind(this)

        this.state = {
            blogs:[],
            trendingArtistBlogs: [],
            listBlogs:[]
        }
    }

    componentWillMount(){
        const previousBlogs = this.state.blogs
        const previousTrendingABlogs = this.state.trendingArtistBlogs
        const previousListBlogs = this.state.listBlogs

        this.blogRef.on('child_added', snap =>{

            if(snap.val().type === 'List'){
                previousListBlogs.push({
                    id: snap.key,
                    type: snap.val().type,
                    title: snap.val().title,
                    sub: snap.val().sub,
                    coverImage: snap.val().coverImage,
                    time: snap.val().time

                })
                this.setState({
                    listBlogs: previousListBlogs
                })
            }

            if(snap.val().type === 'Trending-A'){
                previousTrendingABlogs.push({
                id: snap.key,
                type: snap.val().type,
                artist: snap.val().artist,
                city: snap.val().city,
                rank: snap.val().rank,
                coverImage: snap.val().coverImage,
                time: snap.val().time
                })
                this.setState({
                    trendingArtistBlogs: previousTrendingABlogs
                })
            }
            if(snap.val().type === 'Feature'){
                previousBlogs.push({
                    id: snap.key,
                    type: snap.val().type,
                    title: snap.val().title,
                    sub: snap.val().sub,
                    coverImage: snap.val().coverImage,
                    time: snap.val().time
                })
                this.setState({
                    blogs: previousBlogs
                })
            }
            
        })

        this.blogRef.on('child_removed', snap =>{

            if(snap.val().type === 'List'){
                for(var i=0; i < previousListBlogs.length; i++){
                    if(previousListBlogs[i].id === snap.key){
                      previousListBlogs.splice(i, 1);
                    }
                  }
            
                  this.setState({
                    listBlogs: previousListBlogs
                  })
            }

            if(snap.val().type === 'Trending-A'){
                for(var i=0; i < previousTrendingABlogs.length; i++){
                    if(previousTrendingABlogs[i].id === snap.key){
                      previousTrendingABlogs.splice(i, 1);
                    }
                  }
            
                  this.setState({
                    trendingArtistBlogs: previousTrendingABlogs
                  })
            }

            if(snap.val().type === 'Feature'){
                for(var i=0; i < previousBlogs.length; i++){
                    if(previousBlogs[i].id === snap.key){
                      previousBlogs.splice(i, 1);
                    }
                  }
            
                  this.setState({
                    blogs: previousBlogs
                  })
            }
        })
    }

    removeBlog = (blogId) => {
    
     this.blogRef.child(blogId).remove()
     
     
    }

    


    render(){
        return (
            <div id='news'>
               <Grid 
               container
               direction='row'
               spacing={1}
               >
                   <Grid 
                   item
                   md={4}
                   sm={4}
                   xs={12}
                   >
                       <h1 id='h1-post'>Feature</h1>
                <div>
                   {this.state.blogs.reverse().map((blog)=>{
                       return(
                       <Featured key={blog.id}
                       id={blog.id}
                       title={blog.title}
                       time={blog.time}
                       coverImage={blog.coverImage}
                       sub={blog.sub}
                       removeBlog={this.removeBlog} />
                     
                       )
                   })}    
                </div>
                   </Grid>
                   <Grid 
                   item
                   md={4}
                   sm={4}
                   xs={12}
                   >
                       <h1 id='h1-post'>List</h1>
                 {this.state.listBlogs.reverse().map((list)=>{
                     return(
                         <List
                         key={list.id}
                         id={list.id}
                         title={list.title}
                         sub={list.sub}
                         coverImage={list.coverImage}
                         time={list.time}
                         removeBlog={this.removeBlog}
                         />
                     )
                 })}   
                   </Grid>
                   <Grid 
                   item

                   md={4}
                   sm={4}
                   xs={12}
                   >
                       <h1 id='h1-post'>Trending Artist</h1>
                         {this.state.trendingArtistBlogs.map((trendA)=>{
                             return(
                                <TrendingArtist
                                key={trendA.id}
                                id={trendA.id}
                                artist={trendA.artist}
                                city={trendA.city}
                                rank={trendA.rank}
                                coverImage={trendA.coverImage}
                                removeBlog={this.removeBlog}
                                />
                             )
                         })}
                   </Grid>
                   <Grid 
                   item
                   md={4}
                   sm={4}
                   xs={12}
                   >
                       <h1 id='h1-post'>Recent Post</h1>

                        {this.state.blogs.map((blog)=>{
                            return(
                                <RecentPost
                                key={blog.id}
                                id={blog.id}
                                title={blog.title}
                                time={blog.time}
                                coverImage={blog.coverImage}/>
                            )
                        })}
                   </Grid>
               </Grid>
            </div>
        )
    }
    
}
