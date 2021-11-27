import React, { useContext } from 'react';
import { WorkoutContext } from '../Contexts/WorkoutContext';

const Cadence = () => {
    const {cadence, setCadence} = useContext(WorkoutContext)
    return (
         <div classsName ="form__row">
          <label classsName ="form__label">Cadence</label>
          <input type = 'number' value = {cadence} onChange = {(e) => setCadence(e.target.value)} classsName ="form__input form__input--cadence" placeholder="step/min"/>
        </div>
    )
}

export default Cadence
