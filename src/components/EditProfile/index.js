import React, {useState, useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import app from '../../base'

import './style.css'

export default function EditProfile(props) {
    var [imageUri, setUri] = useState(null)
    var [disabled, setDisabled] = useState(true)
    var [buttonDisabled, setButtonDisabled] = useState(true)

    var [state, setState] = useState(null)
    var [profileImage, setImage] = useState(null)
    var [imageUrl, setUrl] = useState(null)
    var [city, setCity] = useState(null)
    var [cities, setCities] = useState(null)

    var [userName, setUsername] = useState('')
    var [label, setLabel] = useState('')
    var [labels, setLabels] = useState([
        {label: 'Artist'},
        {label: 'Producer'},
        {label: 'Default User'}
        ])
        var [states, setStates] = useState([
            {state: 'Alabama'}, {state: 'Alaska'}, {state: 'Arizona'}, {state: 'Arkansas'}, {state: 'California'},
            {state: 'Colorado'}, {state: 'Connecticut'}, {state: 'Delaware'}, {state: 'Florida'}, {state: 'Georgia'},
            {state: 'Hawaii'}, {state: 'Idaho'}, {state: 'Illinois'}, {state: 'Indiana'}, {state: 'Iowa'},
            {state: 'Kansas'}, {state: 'Kentucky'}, {state: 'Louisiana'}, {state: 'Maine'}, {state: 'Maryland'},
            {state: 'Massachusetts'}, {state: 'Michigan'}, {state: 'Minnesota'}, {state: 'Mississippi'}, {state: 'Missouri'},
            {state: 'Montana'}, {state: 'Nebraska'}, {state: 'Nevada'}, {state: 'New Hampshire'}, {state: 'New Jersey'},
            {state: 'New Mexico'}, {state: 'New York'}, {state: 'North Carolina'}, {state: 'North Dakota'}, {state: 'Ohio'},
            {state: 'Oklahoma'}, {state: 'Oregon'}, {state: 'Pennsylvania'}, {state: 'Rhode Island'}, {state: 'South Carolina'},
            {state: 'South Dakota'}, {state: 'Tennessee'}, {state: 'Texas'}, {state: 'Utah'}, {state: 'Vermont'},
            {state: 'Virginia'}, {state: 'Washington'}, {state: 'West Virginia'}, {state: 'Wisconsin'}, {state: 'Wyoming'}
       ]
       
    )

    const getUserData =(id)=>{
        var userRef = app.database().ref('Users')
        userRef.child(id).on('value', snap=>{
            if(snap.exists()){
                setUsername(snap.val().userName)
                setLabel(snap.val().label)
                setImage(snap.val().profileImage)
            }
        })
    }

    const cancelEdit =()=>{
        props.history.push('/user/' + props.match.params.userId )
    }

    const handleChange=(e)=>{
      
        if(e.target.name === 'label'){
            setLabel(label = e.target.value)
        }
        if(e.target.name === 'city'){
            setCity(city = e.target.value)
        }

        
        if(e.target.name === 'state' && e.target.value !== ""){
            setState(state = e.target.value)
            setDisabled(disabled = false)
        }
        if(e.target.name === 'city' && e.target.value !== ""){
            setButtonDisabled(buttonDisabled = false)
            
        }
        if(e.target.name === 'state' && e.target.value === "Alabama"){
            setCities(cities =  [
                {city: 'Birmingham, AL'},
                {city: 'Mobile, AL'},
                {city: 'Montgomery, AL'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Alaska"){
            setCities(cities =  [
                {city: 'Anchorage, AK'}
        ])
           
        }
        if(e.target.name === 'state' && e.target.value === "Arizona"){
            setCities(cities = [
                {city: 'Chandler, AZ'},
                {city: 'Glendale, AZ'},
                {city: 'Mesa, AZ'},
                {city: 'Phoenix, AZ'},
                {city: 'Scottsdale, AZ'},
                {city: 'Tuscon, AZ'}
            ])
        }
        if(e.target.name === 'state' && e.target.value === "Arkansas"){
            setCities(cities = [
                {city: 'Fayetteville, AR'},
                {city: 'Fort Smith, AR'},
                {city: 'Little Rock, AR'}
        ])
          
        }
        if(e.target.name === 'state' && e.target.value === "California"){
            setCities(cities = [
                {city: 'Bakersfield, CA'},
                {city: 'Fresno, CA'},
                {city: 'Los Angeles, CA'},
                {city: 'Bakersfield, CA'},
                {city: 'Oceanside, CA'},
                {city: 'Oakland, CA'},
                {city: 'San Diego, CA'},
                {city: 'San Francisco, CA'},
                {city: 'San Jose, CA'}
        ])
           
        }
        if(e.target.name === 'state' && e.target.value === "Colorado"){
            setCities(cities =  [
                {city: 'Colorado Springs, CO'},
                {city: 'Denver, CO'},
           ])
           
        }
        if(e.target.name === 'state' && e.target.value === "Connecticut"){
            setCities(cities =  [
                {city: 'Bridgeport, CT'},
                {city: 'Hartford, CT'},
                {city: 'New Haven, CT'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Delaware"){
            setCities(cities = [
                {city: 'Dover, DE'},
                {city: 'Wilmington, DE'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Florida"){
            setCities(cities =  [
                {city: 'Daytona Beach, FL'},
                {city: 'Fort Myers, FL'},
                {city: 'Jacksonville, FL'},
                {city: 'Miami, FL'},
                {city: 'Orlando, FL'},
                {city: 'Pensacola, FL'},
                {city: 'Tallahassee, FL'},
                {city: 'Tampa, FL'},
           ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Georgia"){
            setCities(cities = [
                {city: 'Athens, GA'},
                {city: 'Atlanta, GA'},
                {city: 'Columbus, GA'},
                {city: 'Savannah, GA'}
        ])
        
        }
        if(e.target.name === 'state' && e.target.value === "Hawaii"){
            setCities(cities =  [
                {city: 'Honolulu, HI'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Idaho"){
            setCities(cities =   [
                {city: 'Boise, ID'}
        ])
           
        }
        if(e.target.name === 'state' && e.target.value === "Illinois"){
            setCities(cities =  [
                {city: 'Chicago, IL'},
                {city: 'Peoria, IL'},
                {city: 'Springfield, IL'}
          ])
        }
        if(e.target.name === 'state' && e.target.value === "Indiana"){
            setCities(cities =   [
                {city: 'Indianapolis, IN'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Kansas"){
            setCities(cities =  [
                {city: 'Wichita, KA'},
          ])
           
        }
        if(e.target.name === 'state' && e.target.value === "Kentucky"){
            setCities(cities =  [
                {city: 'Lexington, KY'},
                {city: 'Louiville, KY'}
         ])
        }
        if(e.target.name === 'state' && e.target.value === "Louisiana"){
            setCities(cities =  [
                {city: 'Baton Rouge, LA'},
                {city: 'Lafayette, LA'},
                {city: 'Monroe, LA'},
                {city: 'New Orleans, LA'},
                {city: 'Shreveport, LA'}

          ])
        }

        if(e.target.name === 'state' && e.target.value === "Maine"){
            setCities(cities =  [
                {city: 'Portland, ME'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Maryland"){
            setCities(cities =  [
                {city: 'Baltimore, MD'},
                {city: 'Cambridge, MD'},
                {city: 'Cumberland, MD'},
                {city: 'Frederick, MD'},
                {city: 'Washington D.C.'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Massachusetts"){
            setCities(cities =  [
                {city: 'Boston, MA'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Michigan"){
            setCities(cities =   [
                {city: 'Detroit, MI'},
                {city: 'Grand Rapids, MI'},
                {city: 'Lansing, MI'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Minnesota"){
            setCities(cities =  [
                {city: 'Minneapolis, MN'},
                {city: 'Rochester, MN'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "Mississippi"){
            setCities(cities =  [
                {city: 'Jackson, MS'},
                {city: 'Gulfport, MS'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Missouri"){
            setCities(cities = [
                {city: 'Jefferson City, MO'},
                {city: 'Kansas City, MO'},
                {city: 'St. Louis, MO'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Montana"){
            setCities(cities = [
                {city: 'Billings, MT'}
        ])
       }
        if(e.target.name === 'state' && e.target.value === "Nebraska"){
            setCities(cities = [
                {city: 'Lincoln, NE'},
                {city: 'Omaha, NE'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Nevada"){
            setCities(cities = [
                {city: 'Las Vegas, NV'},
                {city: 'Reno, NV'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "New Hampshire"){
            setCities(cities = [
                {city: 'Manchester, NH'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "New Jersey"){
            setCities(cities = [
                {city: 'Camden, NJ'},
                {city: 'Jersey City, NJ'},
                {city: 'Newark, NJ'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "New Mexico"){
            setCities(cities = [
                {city: 'Santa Fe, NM'}
        ])
            
        }
        if(e.target.name === 'state' && e.target.value === "New York"){
            setCities(cities = [
                {city: 'Albany, NY'},
                {city: 'Buffalo, NY'},
                {city: 'New York, NY'},
                {city: 'Rochester, NY'},
                {city: 'Syracuse, NY'},
                {city: 'Yonkers, NY'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "North Dakota"){
            setCities(cities = [
                {city: 'Fargo, ND'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "North Carolina"){
            setCities(cities = [
                {city: 'Charlotte, NC'},
                {city: 'Fayetteville, NC'},
                {city: 'Greensboro, NC'},
                {city: 'Raleigh, NC'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Ohio"){
            setCities(cities = [
                {city: 'Akron, OH'},
                {city: 'Cincinnati, OH'},
                {city: 'Cleveland, OH'},
                {city: 'Columbus, OH'},
                {city: 'Toledo, OH'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Oklahoma"){
            setCities(cities = [
                {city: 'Oklahoma City, OK'},
                {city: 'Tulsa, OK'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Oregon"){
            setCities(cities =  [
                {city: 'Eugene, OR'},
                {city: 'Portland, OR'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Pennsylvania"){
            setCities(cities =  [
                {city: 'Allen Town, PA'},
                {city: 'Erie, PA'},
                {city: 'Philadelphia, PA'},
                {city: 'Pittsburgh, PA'}     
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Rhode Island"){
            setCities(cities = [
                {city: 'Providence, RI'}  
        ])
        }
        if(e.target.name === 'state' && e.target.value === "South Carolina"){
            setCities(cities =[
                {city: 'Charleston, SC'},
                {city: 'Columbia, SC'},
                {city: 'Greenville, SC'} 
        ])
        }
        if(e.target.name === 'state' && e.target.value === "South Dakota"){
            setCities(cities = [
                {city: 'Sioux Falls, SD'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Tennessee"){
            setCities(cities = [
                {city: 'Knoxville, TN'},
                {city: 'Memphis, TN'},
                {city: 'Nashville, TN'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Texas"){
            setCities(cities = [
                {city: 'Austin, TX'},
                {city: 'Dallas, TX'},
                {city: 'El Paso, TX'},
                {city: 'Houston, TX'},
                {city: 'San Antonio, TX'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Utah"){
            setCities(cities = [
                {city: 'Salt Lake City, UT'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Virginia"){
            setCities(cities = [
                {city: 'Hampton, VA'},
                {city: 'Richmond, VA'},
                {city: 'Virginia Beach, VA'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Washington"){
            setCities(cities = [
                {city: 'Seattle, WA'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "West Virginia"){
            setCities(cities = [
                {city: 'Charleston, WV'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Wisconsin"){
            setCities(cities = [
                {city: 'Green Bay, WI'},
                {city: 'Madison, WI'},
                {city: 'Milwaukee, WI'}
        ])
        }
        if(e.target.name === 'state' && e.target.value === "Wyoming"){
            setCities(cities = [
                {city: 'Casper, WY'},
                {city: 'Cheyenne, WY'}
        ])
        }
        if(e.target.name === 'profileImage' && e.target.files[0]){
            setUri(imageUri = e.target.files[0])
            
            const uploadTask = app.storage().ref(`profile images/${imageUri.name}`).put(imageUri);
            uploadTask.on('state_changed',
            (error)=>{
                //error
                
            }
             ,
             (snapshot)=>{
                //progress
               
                
            }, ()=>{
                //complete
                app.storage().ref('profile images').child(imageUri.name).getDownloadURL()
                .then(url =>{
                    setImage(profileImage = url)
                    
                })
            });
        }
 
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        var id = props.match.params.userId
        if(!id){
            return
        }else{
            var userRef = app.database().ref('Users').child(id)
            userRef.update({
                state: state,
                city: city,
                label: label,
                profileImage: profileImage ? profileImage : 'https://firebasestorage.googleapis.com/v0/b/the-app-af0f5.appspot.com/o/content%20image%2Fnoimage.png?alt=media&token=ad88512f-8cd5-4374-a8a9-310034cde6e6'
    
            }).then(()=>{
                var cityRef = app.database().ref('CityUsers').child(city).child(id).set(true)
               
            }).then(()=>{props.history.push('/user/' + props.match.params.userId)})
        }
       
    }

    useEffect(()=>{
        
    let uid = props.match.params.userId

     getUserData(uid)
            
        
    }, [])


    return (
        <div id='editProfile'>
     
            <div id='cancelEdit'>
              <Button onClick={cancelEdit} variant="contained" color="primary">Cancel Edit Profile</Button>
            </div>

            {profileImage ? (
            <div>
               <img src={profileImage} alt='user image'/>
            </div>
            ):(
            <CircularProgress />)}

            <input onChange={handleChange} type="file" name='profileImage'></input>
            

            <div>
                <TextField
                 id="input"
                 name='userName'
                 disabled
                 value={userName}
                 onChange={handleChange}
                 variant='standard'/>
            </div>

            <div>
            <TextField
                id="input"
                select
                name='label'
                label="Edit Label"
                value={label}
                onChange={handleChange}
                variant='standard'
                
              >
                   {labels.map((label)=>{
                        return(
                         <MenuItem key={label.label} value={label.label}>
                         {label.label}
                         </MenuItem>
                        )
                    })}
              </TextField>
            </div>

            <div>
            <TextField
                id="input"
                select
                name='state'
                label="Edit State"
                value={state}
                onChange={handleChange}
                variant="standard"
                >
                    {states.map((state)=>{
                        return(
                         <MenuItem key={state.state} value={state.state}>
                         {state.state}
                         </MenuItem>
                        )
                    })}
                   
               </TextField>
            </div>

            <div>
            <TextField
                id="input"
                select
                name='city'
                label="Edit City"
                value={city}
                onChange={handleChange}
                variant='standard'
                disabled={disabled}
                >
                    {cities ? cities.map((city)=>{
                        return(
                         <MenuItem key={city.city} value={city.city}>
                         {city.city}
                         </MenuItem>
                        )
                    }): (null)}
                   
               </TextField>
            </div>

            <div id='editBtnSubmit'>
            <Button onClick={handleSubmit} disabled={buttonDisabled} variant="contained" color="primary">Done</Button>
            </div>

        </div>
    )
}
