import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import styles2 from "./button.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoloactionPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  /* 
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng"); */
  const [mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(
    function () {
      if (lat && lng) {
        setMapPosition([lat, lng]);
      } else {
        setMapPosition([40, 0]);
      }
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoloactionPosition) {
        setMapPosition([geoloactionPosition.lat, geoloactionPosition.lng]);
      }
    },
    [geoloactionPosition]
  );

  return (
    <div
      className={styles.mapContainer}
      onClick={(e) => {
        navigate("form");
        //navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }}
    >
      {geoloactionPosition && (
        <button className={styles2.position} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={mapPosition} key={city.id}>
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
