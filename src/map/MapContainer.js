import React, { useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "../App.css";
import { WorkoutContext } from "../Contexts/WorkoutContext";

const ContainerMap = () => {
  const {
    workouts,
    setCoords,
    setIsClicked,
    workoutClicked,
    iniTialCoords,
    setInitialCoords,
    changedCoords,
  } = useContext(WorkoutContext);

  const UpdateMapCenter = (props) => {
    const maps = useMap();
    maps.setView(props.centre);
    return null;
  };

  const MyComponent = () => {
    const map = useMapEvents({
      click: (e) => {
        let { lat, lng } = e.latlng;
        setCoords({
          latitude: lat,
          longitude: lng,
        });
        setIsClicked(true);
      },
    });
    return null;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitialCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <>
      {iniTialCoords !== null ? (
        <MapContainer
          center={[iniTialCoords.latitude, iniTialCoords.longitude]}
          zoom={20}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {workouts.map((location) => {
            return (
              <Marker
                key={location.id}
                position={[location.coords.latitude, location.coords.longitude]}
              >
                <Popup>
                  <p>{`${location.workoutType} at ${location.cityName}`}</p>
                </Popup>
              </Marker>
            );
          })}
          <MyComponent />
          <UpdateMapCenter
            centre={
              workoutClicked
                ? [changedCoords.latitude, changedCoords.longitude]
                : [iniTialCoords.latitude, iniTialCoords.longitude]
            }
          />
        </MapContainer>
      ) : (
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default ContainerMap;
