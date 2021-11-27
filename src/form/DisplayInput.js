import React, { useContext, useEffect, useState } from 'react'
import { WorkoutContext } from '../Contexts/WorkoutContext';





const DisplayInput = () => {


    const {
      setWorkoutClicked,
      workouts, setWorkouts,
      setWorkoutType,
      setCoords,
      duration, setDuration,
      distance, setDistance,
      setCadence, setElevation,
      setPace, setSpeed,
      setisEditing,
      setEditId,
      setIsClicked, 
      iniTialCoords,
      setCityName,
      setChangeCoords
    } = useContext(WorkoutContext);



    const calcPace = duration / distance;
    setPace(calcPace.toFixed(1));

    const calcSpeed = distance / (duration / 60);
    setSpeed(calcSpeed.toFixed(1));

    useEffect(() => {
      workouts.map((workout) => {
         fetch(`https://geocode.xyz/${workout.coords.latitude},${workout.coords.longitude}?geoit=json`)
         .then(res => res.json())
         .then(result => {
            setCityName(`${result.staddress}, ${result.city}`)
         })
           })
      },[workouts])
   
    
      
      return (
      <>
      {workouts.map((workout) => {
    
    const deleteWorkout = () => {
      const newList = workouts.filter((exercise) => exercise.id !== workout.id)
      setWorkouts(newList)
      console.log(workouts)
    }

    const resetWorkout = () => {
      setWorkouts([]);
    }


    const editWorkout = () => {
      const findItem = workouts.find((exercise) => {
        return exercise.id === workout.id
      });

      setisEditing(true);
      setEditId(findItem.id);
      setWorkoutType(findItem.workoutType);
      setCoords(findItem.coords);
      setDuration(findItem.duration)
      setDistance(findItem.distance)
      setElevation(findItem.elevation)
      setPace(findItem.pace)
      setCadence(findItem.cadence)
      setSpeed(findItem.speed);
      setCityName(findItem.cityname);
      setIsClicked(true);
       
    }
    
    const locateWorkout = () => {
       setWorkoutClicked(true);
       const findLocation = workouts.find((exercise) => {
         return exercise.id === workout.id
       });
       console.log(findLocation.coords.latitude, findLocation.coords.longitude)
       setChangeCoords({
         latitude: findLocation.coords.latitude,
         longitude: findLocation.coords.longitude
       })
       console.log(iniTialCoords);   
    }


          return(
          <>
      {iniTialCoords !== null ? 
      <div className = 'workout-container' onClick = {locateWorkout} key = {workout.id}>
      <h2 className = "workout-title">{`${workout.workoutType} at ${workout.cityname}`}</h2>
        <div className = 'workout-info'>
           <div className = "workout-details">
          <span className = "workout-icon">{workout.workoutType === 'running' ? '🏃‍♂️' :'🚴‍♀️'} </span>
          <span className = "workou-value">{workout.distance}</span>
          <span className = "workou-unit"> mi</span>
        </div>
        <div className = "workou-details">
          <span className = "workou-icon">⏱</span>
          <span className = "workou-value">{workout.duration}</span>
          <span className = "workou-unit"> min</span>
        </div>
        {workout.workoutType === 'running' ?  
        <>
        <div className = "workout__details">
            <span className = "workout__icon">⚡️</span>
            <span className = "workout__value">{workout.pace}</span>
            <span className = "workout__unit"> min/mi</span>
          </div>
          <div className = "workout__details">
            <span className = "workout__icon">🦶🏼</span>
            <span className = "workout__value">{workout.cadence}</span>
            <span className = "workout__unit"> spm</span>
          </div>     
        </> :
     <>
    <div className = "workout__details">
        <span className = "workout__icon">⚡️</span>
        <span className = "workout__value">{workout.speed}</span>
        <span className = "workout__unit"> mi/h</span>
      </div>
      <div className = "workout__details">
        <span className = "workout__icon">⛰</span>
        <span className = "workout__value">{workout.elevation}</span>
        <span className = "workout__unit"> ft</span>
      </div>
    </>
    
    }
    
   </div>
    <div className   = 'buttons'>
      <button  onClick = {resetWorkout} >Reset</button>
      <button  onClick = {editWorkout}>Edit</button>
      <button  onClick = {deleteWorkout} >Delete</button>
    </div>
       
      </div>
    : null}
        </>
    )
        })}
      </>
      
      )
          
    
      
    
}

export default DisplayInput
