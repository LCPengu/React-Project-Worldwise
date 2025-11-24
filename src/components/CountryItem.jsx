//import Button from "./Button";
import styles from "./CountryItem.module.css";
import { Link } from "react-router-dom";

function CountryItem({ country }) {
  console.log(country);
  return (
    <li className={styles.countryItem}>
      <Link to={`${country.country}`} className={styles.cityItem}>
        <span>{country.emoji}</span>
        <span>{country.country}</span>
      </Link>
    </li>
  );
}

export default CountryItem;
