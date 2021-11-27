import React, {useEffect, useState} from 'react'
import { WorkoutContext } from '../Contexts/WorkoutContext'
import Cadence from './Cadence';
import Elevation from './Elevation';
import DisplayInput from './DisplayInput'
import ContainerMap from '../map/MapContainer';

//get data from localstorage
const getLocalworkouts = () => {
  const exerciseList = localStorage.getItem('workoutlist');
  if (exerciseList) {
    return JSON.parse(localStorage.getItem('workoutlist'));
  }else{
    return [];
  }
}

const MainPage = () => {


     const [distance, setDistance] = useState('');
     const [duration, setDuration] = useState('');
     const [cadence, setCadence] = useState('');
     const [elevation, setElevation] = useState('');
     const [workoutType, setWorkoutType] = useState('running');
     const [pace, setPace] = useState('');
     const [speed, setSpeed] = useState('');
     const [isClicked, setIsClicked] = useState(false);
     const [isEditing, setisEditing] = useState(false);
     const [editId, setEditId] = useState(null);
     const [workouts, setWorkouts] = useState(getLocalworkouts());
     const [coords, setCoords] =  useState({ latitude: 0, longitude: 0});
     const [workoutClicked, setWorkoutClicked] = useState(false);
     const [findWorkout, setFindWorkout] = useState(null);
     const [iniTialCoords, setInitialCoords] = useState(null);
     const [changedCoords, setChangeCoords] = useState(null);
     const [cityname, setCityName] = useState('');

     const id = (Date.now() + '').slice(-10);

  

    //adding data to localstorage
    useEffect(() => {
      localStorage.setItem('workoutlist', JSON.stringify(workouts))
    }, [workouts])





     const submitWorkout = (e) => {

         e.preventDefault();


         const clearInputs = () => {
             setDistance('');
             setDuration('');
             setCadence('');
             setElevation('');
             setPace('');
             setSpeed('');
         }
    
          if (workouts && isEditing) {

           setWorkouts(workouts.map((exerciselist) => {
             
            if (exerciselist.id === editId) {
               
          
                 return {
                   ...exerciselist,
                   id: id,
                   coords: coords,
                   workoutType: workoutType,
                   duration: duration,
                   distance: distance,
                   cadence: cadence,
                   pace: pace,
                   elevation: elevation,
                   speed: speed,
                   cityname: cityname,
                 }
             
               
               }else {
                 return exerciselist;
             } 
             }))
           setEditId(null)
           setisEditing(false);
           clearInputs();

         }else if (workoutType === 'running') {


             const runningData = {
                 id,
                 coords,
                 workoutType,
                 distance,
                 duration,
                 cadence,
                 pace, 
                 cityname
             };

             setWorkouts(result => [...result, runningData]);
             clearInputs()

         } else if (workoutType === 'cycling') {

             const cyclingData = {
                 id,
                 coords,
                 workoutType,
                 distance,
                 duration,
                 elevation,
                 speed,
                 cityname
             };

             setWorkouts(result => [...result, cyclingData]);
             clearInputs()

         } 
         

         setIsClicked(false)


     }



    return (
        <WorkoutContext.Provider value = {{
        id, 
        coords, setCoords, 
        workoutType, setWorkoutType, 
        workouts, setWorkouts,  
        distance, setDistance, 
        duration, setDuration, 
        cadence, setCadence, 
        elevation, setElevation,  
        pace, setPace, 
        speed, setSpeed, 
        workoutClicked, setIsClicked,
        workoutClicked, setWorkoutClicked, 
        findWorkout, setFindWorkout, 
        isEditing, setisEditing,  
        setEditId,
        iniTialCoords, setInitialCoords,
        changedCoords, setChangeCoords,
        cityname, setCityName,
        }}>
          
        <section className = 'mainPage'>
        <div className = 'sidebar'>
         {isClicked ?
        <form onSubmit = {submitWorkout} className  = "workout-form" >
        <div className ="form-row">
          <label className ="form__label">Type</label>
          <select value = {workoutType} 
          onChange = {(e) => setWorkoutType(e.target.value)} className ="form__input form__input--type">
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
          </select>
        </div>
        <div className ="form-row">
          <label className ="form__label">Distance</label>
          <input type = 'number' value = {distance} onChange = {(e) => setDistance(e.target.value)} className ="form__input form__input--distance" placeholder="mi"  />
        </div>
        <div className ="form-row">
          <label className ="form__label" value>Duration</label>
          <input type = 'number' value = {duration} onChange = {(e) => setDuration(e.target.value)} className ="form__input form__input--duration" placeholder="min" />
        </div>

        {workoutType === 'running' ? <Cadence/> : <Elevation/>}
        
       <button className ="form__btn">{isEditing ? 'Edit' : 'Submit'}</button>
      </form>
      : null}
      <DisplayInput/>
      </div>
       <ContainerMap/>
      </section>
      </WorkoutContext.Provider>
    )
}

export default MainPage
