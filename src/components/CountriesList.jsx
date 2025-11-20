import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountriesList({ cities, isLoading }) {
  const countries = cities.reduce((acc, city) => {
    if (!acc.map((c) => c.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else {
      return acc;
    }
  }, []);

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
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

CountriesList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountriesList;
