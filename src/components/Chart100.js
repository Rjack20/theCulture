import React,{useState, useEffect, Fragment} from 'react'
import {Grid} from '@material-ui/core'
import '../css/chart100.css'
import CityRankCollection from './CityRankCollection'
import CityList from './CityList'
import app from './../base'

export default function Chart100() {
    var [state, setState] = useState(null)
    var [city, setCity] = useState(null)
    var [list, setList] = useState([])
    var [miaList, setMiaList] = useState([])

   


    const users = [
        {id: 1, artist: 'Lil Poppi', rank: '#1', coverArt: require('../assets/meekphoto.jpg') },
        {id: 2, artist: 'Zeke', rank: '#2', coverArt: require('../assets/pic10.jpg') },
        {id: 3, artist: 'Mozzy', rank: '#3', coverArt: require('../assets/pic3.jpg') },
        {id: 4, artist: 'QP', rank: '#4', coverArt: require('../assets/pic5.jpg') },
        {id: 5, artist: 'Murda G', rank: '#5', coverArt: require('../assets/pic9.jpg') },
        {id: 6, artist: 'Billy Boom', rank: '#6', coverArt: require('../assets/pic8.jpg') },
        {id: 7, artist: 'RogerB', rank: '#7', coverArt: require('../assets/tyler.jpg') },
        {id: 8, artist: 'Zanex', rank: '#8', coverArt: require('../assets/white-rapper.jpg') }

    ]

    const getTopFourMia =()=>{
 
        app.database().ref('CityUsers').child('Miami, FL').on('value', snap => {
            var values = snap.val() || {};
            const userIds = Object.keys(values);
           
            const promises = userIds.map(
              uid => app.database().ref(`/Users/${uid}`).once('value')
            );
            
            Promise.all(promises).then(results => {
              results.forEach(result => {
                values = result.val();
        
                
              list.push(values)
              
              });
              function sortRatings(a,b){
                  let result = 0
        
                  let dataA = a.rating
                  let dataB = b.rating
        
                  dataA > dataB ? result = 1 : result = -1
                  return result
              }
             
             var finalList = list.sort(sortRatings).reverse().slice(0, 4).map((i)=>{ return i})
             setMiaList(miaList = finalList)

              
              
            });
             
          });
        }
    

    const handleInput=(e)=>{
        const value = e.target.value

        if(e.target.name === 'state'){
            setState(state = value)
            console.log(state)
        }

        if(e.target.name === 'city'){
            setCity(city = value)
            console.log(city)
        }
       
        

    }

    
    var citySelect = (state) =>{
        switch(state) {
          case 'Alabama':
            return (
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Birmingham, AL"></option>
                <option value="Mobile, AL"></option>
                <option value="Montgomery, AL"></option>
              </datalist>
              </div>
            );
        case 'Alaska':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Anchorage, AK"></option>
                </datalist>
                </div>
            )
        case 'Arizona':
        return(
            <div>
            <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
            <datalist id="city">
            <option value="Chandler, AZ"></option>
            <option value="Glendale, AZ"></option>
            <option value="Mesa, AZ"></option>
            <option value="Phoenix, AZ"></option>
            <option value="Scottsdale, AZ"></option>
            <option value="Tuscon, AZ"></option>
            </datalist>
            </div>
        )
        case 'Arkansas':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Fayetteville, AR"></option>
                <option value="Fort Smith, AR"></option>
                <option value="Little Rock, AR"></option>
                </datalist>
                </div>
            )
        case 'California':
        return(
            <div>
            <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
            <datalist id="city">
            <option value="Bakersfield, CA"></option>
            <option value="Fresno, CA"></option>
            <option value="Los Angeles, CA"></option>
            <option value="Oceanside, CA"></option>
            <option value="Oakland, CA"></option>
            <option value="San Diego, CA"></option>
            <option value="San Francisco, CA"></option>
            <option value="San Jose, CA"></option>
            </datalist>
            </div>
        )
        case 'Colorado':
        return(
            <div>
            <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
            <datalist id="city">
            <option value="Colorado Springs, CO"></option>
            <option value="Denver, CO"></option>
            </datalist>
            </div>
        )
        case 'Connecticut':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Bridgeport, CT"></option>
                <option value=">Hartford, CT"></option>
                <option value=">New Haven, CT"></option>
                </datalist>
                </div>
            )
        case 'Delaware':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Dover, DE"></option>
                <option value="Wilmington, DE"></option>
                </datalist>
                </div>
            )
            case 'Florida':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Daytona Beach, FL"></option>
                <option value="Fort Myers, FL"></option>
                <option value="Ft. lauderdale, FL"></option>
                <option value="Jacksonville, FL"></option>
                <option value="Miami, FL"></option>
                <option value="Orlando, FL"></option>
                <option value="Pensacola, FL"></option>
                <option value="Tallahassee, FL"></option>
                <option value="Tampa, FL"></option>
                </datalist>
                </div>
            )
        case 'Georgia':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Athens, GA"></option>
                <option value="Atlanta, GA"></option>
                <option value="Columbus, GA"></option>
                <option value="Savannah, GA"></option>
                </datalist>
                </div>
            )
            case 'Hawaii':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Honolulu, HI"></option>
                </datalist>
                </div>
            )
            case 'Idaho':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Boise, ID"></option>
                    </datalist>
                    </div>
                )
                case 'Illinois':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Chicago, IL"></option>
                    <option value="Peoria, IL"></option>
                    <option value="Springfield, IL"></option>
                    </datalist>
                    </div>
                )
                case 'Indiana':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Indianapolis, IN"></option>
                    </datalist>
                    </div>
                )
        case 'Iowa':
        return(
            <div>
            <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
            <datalist id="city">
            <option value="Des Moines, IL"></option>
            <option value="Cedar Rapids, IL"></option>
            </datalist>
            </div>
        )
            case 'Kansas':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Wichita, KA"></option>
                    </datalist>
                    </div>
                )
           case 'Kentucky':
            return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Lexington, KY"></option>
                <option value="Louiville, KY"></option>
                </datalist>
                </div>
            )
            case 'Louisiana':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Baton Rouge, LA"></option>
                    <option value="Lafayette, LA"></option>
                    <option value="Monroe, LA"></option>
                    <option value="New Orleans, LA"></option>
                    <option value="Shreveport, LA"></option>
                    </datalist>
                    </div>
                )
                case 'Maine':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Portland, ME"></option>
                    </datalist>
                    </div>
                )
            case 'Maryland':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Baltimore, MD"></option>
                    <option value="Cambridge, MD"></option>
                    <option value="Cumberland, MD"></option>
                    <option value="Frederick, MD"></option>
                    <option value="Washington D.C."></option>
                    </datalist>
                    </div>
                )
            case 'Massachusetts':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Boston, MA"></option>
                    </datalist>
                    </div>
                )
            case 'Michigan':
                return(
                <div>
                <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                <datalist id="city">
                <option value="Detroit, MI"></option>
                <option value="Grand Rapids, MI"></option>
                <option value="Lansing, MI"></option>
                </datalist>
                </div>
                )
            case 'Minnesota':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Minneapolis, MN"></option>
                    <option value="Rochester, MN"></option>
                    </datalist>
                    </div>
                    )
            case 'Mississippi':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Jackson, MS"></option>
                    <option value="Gulfport, MS"></option>
                    </datalist>
                    </div>
                    )
            case 'Missouri':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Jefferson City, MO"></option>
                    <option value="Kansas City, MO"></option>
                    <option value="St. Louis, MO"></option>
                    </datalist>
                    </div>
                    )
            case 'Montana':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Billings, MT"></option>
                    </datalist>
                    </div>
                    )
            case 'Nebraska':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Lincoln, NE"></option>
                    <option value="Omaha, NE"></option>
                    </datalist>
                    </div>
                    )
            case 'Nevada':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Las Vegas, NV"></option>
                    <option value="Reno, NV"></option>
                    </datalist>
                    </div>
                    )
            case 'New Hampshire':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Manchester, NH"></option>
                    </datalist>
                    </div>
                    )
            case 'New Jersey':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Camden, NJ"></option>
                    <option value="Jersey City, NJ"></option>
                    <option value="Newark, NJ"></option>
                    </datalist>
                    </div>
                    )
            case 'New Mexico':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Santa Fe, NM"></option>
                    </datalist>
                    </div>
                    )
            case 'New York':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Albany, NY"></option>
                    <option value="Buffalo, NY"></option>
                    <option value="New York, NY"></option>
                    <option value="Rochester, NY"></option>
                    <option value="Syracuse, NY"></option>
                    <option value="Yonkers, NY"></option>
                    </datalist>
                    </div>
                    )
            case 'North Dakota':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Fargo, ND"></option>
                    </datalist>
                    </div>
                    )
            case 'North Carolina':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Charlotte, NC"></option>
                    <option value="Fayetteville, NC"></option>
                    <option value="Greensboro, NC"></option>
                    <option value="Raleigh, NC"></option>
                    </datalist>
                    </div>
                    )
            case 'Ohio':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Akron, OH"></option>
                    <option value="Cincinnati, OH"></option>
                    <option value="Cleveland, OH"></option>
                    <option value="Columbus, OH"></option>
                    <option value="Toledo, OH"></option>
                    </datalist>
                    </div>
                    )
            case 'Oklahoma':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Oklahoma City, OK"></option>
                    <option value="Tulsa, OK"></option>
                    </datalist>
                    </div>
                    )
            case 'Oregon':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Eugene, OR"></option>
                    <option value="Portland, OR"></option>
                    </datalist>
                    </div>
                    )
            case 'Pennsylvania':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Eugene, OR"></option>
                    <option value="Portland, OR"></option>
                    </datalist>
                    </div>
                    )
            case 'Rhode Island':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Providence, RI"></option>
                    </datalist>
                    </div>
                    )
            case 'South Carolina':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Charleston, SC"></option>
                    <option value="Columbia, SC"></option>
                    <option value="Greenville, SC"></option>
                    </datalist>
                    </div>
                    )
            case 'South Dakota':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Sioux Falls, SD"></option>
                    </datalist>
                    </div>
                    )
            case 'Tennessee':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Knoxville, TN"></option>
                    <option value="Memphis, TN"></option>
                    <option value="Nashville, TN"></option>
                    </datalist>
                    </div>
                    )
            case 'Texas':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Austin, TX"></option>
                    <option value="Dallas, TX"></option>
                    <option value="El Paso, TX"></option>
                    <option value="Houston, TX"></option>
                    <option value="San Antonio, TX"></option>
                    </datalist>
                    </div>
                    )
            case 'Utah':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Salt Lake City, UT"></option>
                    </datalist>
                    </div>
                    )
            case 'Virginia':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Hampton, VA"></option>
                    <option value="Richmond, VA"></option>
                    <option value="Virginia Beach, VA"></option>
                    </datalist>
                    </div>
                    )
            case 'Washington':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Seattle, WA"></option>
                    </datalist>
                    </div>
                    )
            case 'West Virginia':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Charleston, WV"></option>
                    </datalist>
                    </div>
                    )
            case 'Wisconsin':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Green Bay, WI"></option>
                    <option value="Madison, WI"></option>
                    <option value="Milwaukee, WI"></option>
                    </datalist>
                    </div>
                    )
            case 'Wyoming':
                return(
                    <div>
                    <input onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="city"/>
                    <datalist id="city">
                    <option value="Casper, WY"></option>
                    <option value="Cheyenne, WY"></option>
                    </datalist>
                    </div>
                    )
          default:
            return <input disabled={true} onChange={handleInput} type="text" id='content-choose'  name='city' placeholder="Choose City" className="sel1" list="none"/>;
        }
      }


      useEffect(()=>{
        getTopFourMia()
      },[])

    return (
        <div id='wrapper'>
         
            <div id='selector-flex-parent'>

            
            <div id='state-container'>
            <input id='state-input' onChange={handleInput} type="text" id='content-choose'  name='state' placeholder="Choose State" className="sel1" list="state"/>
               <datalist id="state">
                 <option value="Alabama"></option>
                 <option value="Alaska"></option>
                 <option value="Arizona"></option>
                 <option value="Arkansas"></option>
                 <option value="California"></option>
                 <option value="Colorado"></option>
                 <option value="Connecticut "></option>
                 <option value="Delaware"></option>
                 <option value="Florida"></option>
                 <option value="Georgia"></option>
                 <option value="Hawaii"></option>
                 <option value="Idaho"></option>
                 <option value="Illinois"></option>
                 <option value="Iowa"></option>
                 <option value="Kansas"></option>
                 <option value="Kentucky"></option>
                 <option value="Louisiana"></option>
                 <option value="Maine"></option>
                 <option value="Maryland"></option>
                 <option value="Massachusetts"></option>
                 <option value="Michigan"></option>
                 <option value="Minnesota"></option>
                 <option value="Mississippi"></option>
                 <option value="Missouri"></option>
                 <option value="Montana"></option>
                 <option value="Nebraska"></option>
                 <option value="Nevada"></option>
                 <option value="New Hampshire"></option>
                 <option value="New Jersey"></option>
                 <option value="New Mexico"></option>
                 <option value="New York"></option>
                 <option value="North Carolina"></option>
                 <option value="North Dakota"></option>
                 <option value="Feature"></option>
                 <option value="Ohio"></option>
                 <option value="Oklahoma"></option>
                 <option value="Pennsylvania"></option>
                 <option value="Rhode Island"></option>
                 <option value="South Carolina"></option>
                 <option value="South Dakota"></option>
                 <option value="Tennessee"></option>
                 <option value="Texas"></option>
                 <option value="Utah"></option>
                 <option value="Vermont"></option>
                 <option value="Virginia"></option>
                 <option value="Washington"></option>
                 <option value="West Virginia"></option>
                 <option value="Wisconsin"></option>
                 <option value="Wyoming"></option>
               </datalist>
            </div>
            <div id='city-container'>
                {citySelect(state)}
            </div>
            </div>
            {!city ?
             ( 
          <Fragment>
             
             <Grid
                container
                spacing={1}
                
                >
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                     <div id='chartCity'>
                      <p>Atalnta</p>
                     </div>

                     {miaList ? miaList.map((user, index)=>{
                            return(
                        <CityRankCollection
                         key={user.userId}
                         userId={user.userId}
                         userName={user.userName}
                         city={user.city}
                         label={user.label}
                         profileImage={user.profileImage}
                         index={index}

                        />
                        )

                     }) : (null)}
                     
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                     <div id='chartCity'>
                      <p>New York</p>
                     
                    </div>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                  <div id='chartCity'>
                      <p>Philly</p>
                      
                  </div>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                  <div id='chartCity'>
                   <p>Houston</p>
                   
                  </div>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                  <div id='chartCity'>
                  <p>Chicago</p>
                  
                  </div>
                    </Grid>
                    <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    >
                  <div id='chartCity'>
                  <p>Miami</p>
                 
                  </div>
                       
                    </Grid>
                    
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                  <div id='chartCity'>
                  <p>Los Angeles</p>
                  
                  </div>
                      
                    </Grid>
                    
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    > 
                  <div id='chartCity'>
                  <p>Chicago</p>
                  
                  </div>
                    </Grid>
      
                </Grid>
                </Fragment>
                )
             :
             (
             <div>
             <p id='selectedCity'>Top 100 Artist In {city}</p>
             
                 <CityList
                
                 artist1={users[0].artist}
                 rank1={users[0].rank}
                 coverArt1={users[0].coverArt}
                 artist2={users[0].artist}
                 rank2={users[1].rank}
                 coverArt2={users[1].coverArt}
                 artist3={users[2].artist}
                 rank3={users[2].rank}
                 coverArt3={users[2].coverArt}
                 artist4={users[3].artist}
                 rank4={users[3].rank}
                 coverArt4={users[3].coverArt}
                 artist5={users[4].artist}
                 rank5="#9"
                 coverArt5={users[4].coverArt}
                 artist6={users[5].artist}
                 rank6="#10"
                 coverArt6={users[5].coverArt}
                 artist7={users[6].artist}
                 rank7='#11'
                 coverArt7={users[6].coverArt}
                 artist8={users[7].artist}
                 rank8='#12'
                 coverArt8={users[7].coverArt}

                 />
           
             </div>
             )
             }
         
        </div>
    )
}
