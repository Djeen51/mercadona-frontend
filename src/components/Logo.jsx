import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
  <Link to="/">
  <img src="https://studitest.fly.dev/data/logo.png" alt="Mercadona logo" className={styles.logo} />
  </Link>)
}

export default Logo;