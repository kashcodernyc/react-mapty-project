import React, { useContext } from "react";
import { WorkoutContext } from "../Contexts/WorkoutContext";
import { themes, WorkoutContainer } from "../themes";
import { ThemeProvider } from "styled-components";

const DisplayInput = () => {
  const {
    setWorkoutClicked,
    workouts,
    setWorkouts,
    setWorkoutType,
    setCoords,
    duration,
    setDuration,
    distance,
    setDistance,
    setCadence,
    setElevation,
    setPace,
    setSpeed,
    setIsEditing,
    setEditId,
    setIsClicked,
    iniTialCoords,
    setCityName,
    setChangedCoords,
    theme,
  } = useContext(WorkoutContext);

  const calcPace = duration / distance;
  setPace(calcPace.toFixed(1));

  const calcSpeed = distance / (duration / 60);
  setSpeed(calcSpeed.toFixed(1));

  const deleteWorkout = (index) => {
    const newList = workouts.filter((exercise) => {
      return index !== exercise.id;
    });
    setWorkouts(newList);
  };

  const resetWorkout = () => {
    setWorkouts([]);
    localStorage.clear(workouts);
  };

  const editWorkout = (id) => {
    const findItem = workouts.find((exercise) => {
      return exercise.id === id;
    });

    setIsEditing(true);
    setEditId(findItem.id);
    setWorkoutType(findItem.workoutType);
    setCoords(findItem.coords);
    setDuration(findItem.duration);
    setDistance(findItem.distance);
    setElevation(findItem.elevation);
    setPace(findItem.pace);
    setCadence(findItem.cadence);
    setSpeed(findItem.speed);
    setCityName(findItem.cityName);
    setIsClicked(true);
  };

  const locateWorkout = (id) => {
    setWorkoutClicked(true);
    const findLocation = workouts.find((exercise) => {
      return exercise.id === id;
    });

    setChangedCoords({
      latitude: findLocation.coords.latitude,
      longitude: findLocation.coords.longitude,
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();

  return (
    <ThemeProvider theme={themes[theme]}>
      {iniTialCoords !== null ? (
        <div>
          {workouts.map((workout) => {
            return (
              <div key={workout.id}>
                <WorkoutContainer
                  onClick={() => locateWorkout(workout.id)}
                  className={`workout-container${
                    workout.workoutType === "Running" ? "-running" : "-cycling"
                  }`}
                >
                  <h2 className="workout-title">{`${workout.workoutType} on ${
                    months[date.getMonth()]
                  } ${date.getDate()}, ${date.getFullYear()}`}</h2>

                  <div className="workout-info">
                    <div className="workout-details">
                      <span className="workout-icon">
                        {workout.workoutType === "Running" ? "🏃‍♂️" : "🚴‍♀️"}{" "}
                      </span>
                      <span className="workou-value">{workout.distance}</span>
                      <span className="workou-unit"> mi</span>
                    </div>
                    <div className="workou-details">
                      <span className="workou-icon">⏱</span>
                      <span className="workou-value">{workout.duration}</span>
                      <span className="workou-unit"> min</span>
                    </div>
                    {workout.workoutType === "Running" ? (
                      <>
                        <div className="workout__details">
                          <span className="workout__icon">⚡️</span>
                          <span className="workout__value">{workout.pace}</span>
                          <span className="workout__unit"> min/mi</span>
                        </div>
                        <div className="workout__details">
                          <span className="workout__icon">🦶🏼</span>
                          <span className="workout__value">
                            {workout.cadence}
                          </span>
                          <span className="workout__unit"> spm</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="workout__details">
                          <span className="workout__icon">⚡️</span>
                          <span className="workout__value">
                            {workout.speed}
                          </span>
                          <span className="workout__unit"> mi/h</span>
                        </div>
                        <div className="workout__details">
                          <span className="workout__icon">⛰</span>
                          <span className="workout__value">
                            {workout.elevation}
                          </span>
                          <span className="workout__unit"> ft</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="buttons">
                    <button onClick={() => editWorkout(workout.id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteWorkout(workout.id)}>
                      Delete
                    </button>
                  </div>
                </WorkoutContainer>
              </div>
            );
          })}
          {workouts.length > 0 ? (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => resetWorkout()}
            >
              Reset
            </button>
          ) : null}
        </div>
      ) : null}
    </ThemeProvider>
  );
};

export default DisplayInput;
