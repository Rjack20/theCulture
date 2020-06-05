import React,{useState,useEffect} from 'react'
import './style.css'
import app from '../../base'



export default function BlogDetails(props) {
    const [id, setId] = useState(null)
    var [title, setTitle] = useState(null)
    var [coverImage, setImage] = useState(null)
    var [time, setTime] = useState(null)
    var[listHeader, setHeader]=useState(null)
    var[artist, setArtist] = useState(null)
    var[city, setCity] = useState(null)
    var[rank, setRank] = useState(null)
    var [blogType, setType] = useState(null)
    var [body, setBody] = useState(null)
    var [ytUrl, setYtUrl] = useState(null)
   
    
    

    useEffect(()=>{
        let id = props.match.params.id
        setId(id = id)
        var blogRef = app.database().ref().child('Blogs').child(id)

        blogRef.on('value', snap=>{
            setType(blogType = snap.val().type)
            setArtist(artist = snap.val().artist)
            setCity(city = snap.val().city)
            setRank(rank = snap.val().rank)
            setTitle(title = snap.val().title)
            setHeader(listHeader = snap.val().listHeaderBody)
            setBody(body = snap.val().body)
            setImage(coverImage = snap.val().coverImage)
            setBody(body = snap.val().body)
            setTime(time = snap.val().time)
            setYtUrl(ytUrl = snap.val().youtubeUrl)
        })

    
        
    })

    
    
    return (
         <div>
        <div id='blogDetailsContainer'>
            <div id='blogDetailsCard'>
                <div id='blogDetailsImgCntainer'>
                  <img id='blogDetailsImg' src={coverImage} alt='Cover Art'/>
                  
                  <div>
                    {blogType === 'Trending-A' ? 
                    (
                      <div>
                    <p id='detailsArtist'>{artist}</p>
                    <p id='detailsCity'>{city}</p>
                    <p id='detailsRank'>{rank}</p>
                    </div>
                    ) : 
                    (
                      <p id='detailsTitle'>{title}</p>
                    )}
                    
                  </div>
                  
                  <div>
                    <p id='detailsTime'>{time}</p>
                  </div>
                  <div>
                    <p id='detailsAuthor'> by Anynomous</p>
                  </div>
                 </div>
                   
                </div>
  
        </div>
         <div id='blogBodyContainer' >
         <div id='blogBody'>
            {blogType === 'List' ?
            (
              <p>{listHeader}</p>
            )
            :
            (
              <p>{body}</p>
            )}
            
             <iframe width="560" height="315" 
             src={ytUrl} 
             frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen>

             </iframe>
             <p>
                 Taking a chance on yourself can change your life 
              while having the right friends and family to inspire 
              you helps, too. Years ago, Fredo Bang was just a teen 
              with a brother (who Fredo considered "garbage" at rap) 
              and friends who made music. One day, his friends asked a 
              14-year-old Fredo to come to their makeshift home studio
              and record; they said he reminded them of Gucci Mane.
              That fateful day was the start of a career that has so far
              culminated in Fredo's breakout hit "Oouuh," which has been
              streamed 15 million times on Spotify, a Def Jam deal, and a
              multitude of projects, including this Friday's Most Hated
              featuring YNW Melly, Lil Baby, Tee Grizzley and more.
             </p>
             
         </div>
      
     </div>
     </div>
            
            
            
            
        
    )
}
