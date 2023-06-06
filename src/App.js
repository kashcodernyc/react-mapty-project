import React, { useEffect, useState } from "react";
import { WorkoutContext } from "./Contexts/WorkoutContext";
import DisplayInput from "./Components/DisplayInput";
import ContainerMap from "./map/MapContainer";
import { FaMapMarkedAlt } from "react-icons/fa";
import { ThemeProvider } from "styled-components";
import { themes, Toggle, Page, Form } from "./themes";
import "./App.css";

//get data from localstorage
const getLocalworkouts = () => {
  const exerciseList = localStorage.getItem("workoutlist");
  if (exerciseList) {
    return JSON.parse(localStorage.getItem("workoutlist"));
  } else {
    return [];
  }
};

const App = () => {
  const [theme, setTheme] = useState("light");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cadence, setCadence] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [workoutType, setWorkoutType] = useState("Running");
  const [pace, setPace] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [workouts, setWorkouts] = useState(getLocalworkouts());
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [workoutClicked, setWorkoutClicked] = useState(false);
  const [findWorkout, setFindWorkout] = useState(null);
  const [iniTialCoords, setInitialCoords] = useState(null);
  const [changedCoords, setChangedCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [cityName, setCityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const id = (Date.now() + "").slice(-10);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const fetchCityName = async () => {
    try {
      const fetchCity = await fetch(
        `https://geocode.xyz/${coords.latitude},${coords.longitude}?geoit=json`
      );
      const response = await fetchCity.json();
      setCityName(`${response.staddress}, ${response.city}`);
    } catch (err) {
      console.log(`error while feching cityname`);
    }
  };

  useEffect(() => {
    fetchCityName();
    console.log(workouts);
  }, [coords]);

  //adding data to localstorage
  useEffect(() => {
    localStorage.setItem("workoutlist", JSON.stringify(workouts));
  }, [workouts]);

  const clearInputs = () => {
    setDistance("");
    setDuration("");
    setCadence("");
    setElevation("");
    setPace("");
    setSpeed("");
  };

  const submitWorkout = (e) => {
    e.preventDefault();

    if (workouts && isEditing) {
      setWorkouts(
        workouts.map((exerciselist) => {
          if (exerciselist.id === editId) {
            return {
              ...exerciselist,
              id: id,
              coords: coords,
              workoutType: workoutType,
              distance: distance,
              duration: duration,
              cadence: cadence,
              pace: pace,
              elevation: elevation,
              speed: speed,
              cityName: cityName,
            };
          } else {
            return exerciselist;
          }
        })
      );
      setEditId(null);
      setIsEditing(false);
      clearInputs();
      setIsClicked(false);
    } else if (
      workoutType === "Running" &&
      distance > 0 &&
      duration > 0 &&
      cadence > 0
    ) {
      const runningData = {
        id,
        coords,
        workoutType,
        distance,
        duration,
        cadence,
        pace,
        cityName,
      };

      setWorkouts((result) => [...result, runningData]);
      clearInputs();
      setIsClicked(false);
      setErrorMessage("");
    } else if (
      workoutType === "Cycling" &&
      distance > 0 &&
      duration > 0 &&
      elevation > 0
    ) {
      const cyclingData = {
        id,
        coords,
        workoutType,
        distance,
        duration,
        elevation,
        speed,
        cityName,
      };

      setWorkouts((result) => [...result, cyclingData]);
      clearInputs();
      setIsClicked(false);
      setErrorMessage("");
    } else {
      setErrorMessage(`! input value have to be greater than 0`);
    }
  };

  const closeForm = (e) => {
    e.preventDefault();
    clearInputs();
    setIsClicked(false);
  };

  return (
    <WorkoutContext.Provider
      value={{
        id,
        coords,
        setCoords,
        workoutType,
        setWorkoutType,
        workouts,
        setWorkouts,
        distance,
        setDistance,
        duration,
        setDuration,
        cadence,
        setCadence,
        elevation,
        setElevation,
        pace,
        setPace,
        speed,
        setSpeed,
        setIsClicked,
        workoutClicked,
        setWorkoutClicked,
        findWorkout,
        setFindWorkout,
        isEditing,
        setIsEditing,
        setEditId,
        iniTialCoords,
        setInitialCoords,
        changedCoords,
        setChangedCoords,
        cityName,
        setCityName,
        theme,
        setTheme,
      }}
    >
      <ThemeProvider theme={themes[theme]}>
        <Page className="mainPage">
          <div className="sidebar">
            {iniTialCoords !== null ? (
              <>
                <div className="icon">
                  <FaMapMarkedAlt />
                </div>

                <p className="direction">
                  {" "}
                  click on the map to input your workout{" "}
                </p>
                <div className="toggle">
                  <Toggle className="toggle-theme">
                    <input
                      className="switch"
                      type="checkbox"
                      onClick={changeTheme}
                    />
                  </Toggle>
                </div>
              </>
            ) : (
              <FaMapMarkedAlt className="loading-map" />
            )}

            {isClicked ? (
              <Form className="workout-form">
                <p className="error-msg">{errorMessage}</p>
                <div className="form-row">
                  <label className="form--label">Type</label>
                  <select
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                  >
                    <option value="Running">Running</option>
                    <option value="Cycling">Cycling</option>
                  </select>
                </div>

                <div className="form-row">
                  <label className="form__label" value>
                    Distance
                  </label>
                  <input
                    type="number"
                    name="distance"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="mi"
                    autoFocus
                  />
                </div>

                <div className="form-row">
                  <label className="form__label" value>
                    Duration
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="min"
                  />
                </div>

                {workoutType === "Running" ? (
                  <div className="form__row">
                    <label className="form__label">Cadence</label>
                    <input
                      type="number"
                      name="cadence"
                      value={cadence}
                      onChange={(e) => setCadence(e.target.value)}
                      id="form-cadence"
                      placeholder="step/min"
                    />
                  </div>
                ) : (
                  <div className="form__row">
                    <label className="form__label">Elev Gain</label>
                    <input
                      type="number"
                      name="elevation"
                      value={elevation}
                      onChange={(e) => setElevation(e.target.value)}
                      placeholder="feet"
                    />
                  </div>
                )}
                <div className="button">
                  <button className="form__btn" onClick={submitWorkout}>
                    {`${isEditing ? "Save" : "Submit"}`}
                  </button>
                  <button className="form__btn" onClick={closeForm}>
                    Close
                  </button>
                </div>
              </Form>
            ) : null}

            <DisplayInput key={id} />
          </div>
          <ContainerMap />
        </Page>
      </ThemeProvider>
    </WorkoutContext.Provider>
  );
};

export default App;
