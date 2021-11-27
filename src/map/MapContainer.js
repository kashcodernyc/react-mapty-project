import { map } from 'leaflet';
import React, {useEffect, useState, useContext,  useRef }from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import '../App.css';
import { WorkoutContext } from '../Contexts/WorkoutContext'

const ContainerMap = () => {

  const {
    workouts,
    setCoords,
    setIsClicked,
    workoutClicked, 
    iniTialCoords,setInitialCoords,
    cityname,
    changedCoords,
  } = useContext(WorkoutContext);

  const MyComponent = () => {
    const map = useMapEvents({
      click: (e) => {
      let {lat,lng} = e.latlng;
      setCoords({latitude: lat, longitude: lng})
      setIsClicked(true);
      },
    });
    return null;
  }



  useEffect(() => {
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition((position) => {
         setInitialCoords({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
         })
    })
    }
  },[])
  
   

  
  return (
<>
{iniTialCoords !== null ?
 < MapContainer center = {
     workoutClicked !== true ? [iniTialCoords.latitude, iniTialCoords.longitude] : [changedCoords.latitude, changedCoords.longitude] 
     }
     zoom = {
       20
     } >
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {workouts.map((location) => {
  return(
  <Marker key = {location.id} position={[location.coords.latitude, location.coords.longitude]}>
    <Popup>
      <p>{`${location.workoutType} at ${cityname}`}</p>
    </Popup>
  </Marker> 
  )})}
 <MyComponent/>
</MapContainer>
: <h1>Loading...</h1>} 
</>
  )
}

export default ContainerMap;
