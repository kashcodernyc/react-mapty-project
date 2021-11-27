import React, { useContext } from 'react'
import { WorkoutContext } from '../Contexts/WorkoutContext'

const Elevation = () => {
    const {elevation, setElevation} = useContext(WorkoutContext);
    return (
         <div classsName ="form__row form__row--hidden">
          <label classsName ="form__label">Elev Gain</label>
          <input type = 'number' value = {elevation} onChange = {(e) => setElevation(e.target.value)} classsName ="form__input form__input--elevation" placeholder="feet" />
        </div>
    )
}

export default Elevation
