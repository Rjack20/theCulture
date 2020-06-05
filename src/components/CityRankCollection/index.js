import React, {Component, useState} from 'react'
import './style.css'
import { Grid, requirePropFactory } from '@material-ui/core'
import {Link} from 'react-router-dom'
import app from '../../base'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';



export default class CityRankCollection extends Component {
    constructor(props){
        super(props)

       this.getRank = this.getRank.bind(this)

    }
 
        getRank(index){
            if(index === 0){
                return (
                    <div id='rankOneRank'>
                    <span>#1</span>
                </div>
                )
            }
            if(index === 1){
                return (
                    <div id='rankOneRank'>
                    <span>#2</span>
                </div>
                )
            }
            if(index === 2){
                return (
                    <div id='rankOneRank'>
                    <span>#3</span>
                </div>
                )
            }
            if(index === 3){
                return (
                    <div id='rankOneRank'>
                    <span>#4</span>
                </div>
                )
            }
        }


    render(){
var rank = this.getRank(this.props.index)
    
    return (
        <div id='cityCollection'>
     <Link id='cityRankLink' to={'/user' + '/' + this.props.userId}>
    <Card >
      <CardHeader
        avatar={ <div id='chartImg'>
                  <img src={this.props.profileImage}/>
                 </div>}


        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<div id='chartUsername'><span>{this.props.userName}</span></div>}
        
        subheader={this.props.label}
        
      />
      
 
      <CardContent>
        <Typography variant="h4" color="textSecondary" component="p">
        {rank}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
      </CardActions>
  
    </Card>
    </Link>      
            <Grid
            container
            spacing={0}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}

                >
              
                </Grid>

            </Grid>
        
            
        </div>
    )
  }
}
