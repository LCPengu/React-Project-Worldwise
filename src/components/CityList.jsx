import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../context/CitiesContext.jsx";

function CityList() {
  const { cities, isLoading } = useCities();
  // const len = cities.length;
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return (
      <p className={styles.noCities}>
        <Message message="Add your first city by clicking on a city on the map" />
      </p>
    );
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
