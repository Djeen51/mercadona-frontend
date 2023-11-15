import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import Header from "../components/Header";



export default function Homepage() {
  return (
    <>
    <Header/>
    <main className={styles.homepage}>
      <section >
        <h1 style={{color: "whitesmoke"}}>
          Start your Shopping at Mercadona
          <br />
         Online Shopping 
        </h1>
        <h2>
          Receive your order at home with the same quality and freshness
        </h2>
        <Link to="catalogue" className="cta">START YOUR SHOPPING NOW</Link>
      </section>
    </main>
    </>
  );
}
