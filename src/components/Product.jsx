import { Link } from 'react-router-dom'
import styles from './Product.module.css'
import { Flyo } from '../constants/URL';

function Product({name, description,price, id, image, percentage, discounted, endDate, startDate}) {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    const isDiscounted = startDateObj <= today && today <= endDateObj;


    return (
        <li className={styles.product}>
            <Link to={`${id}`} >
                <article className={styles.vignette}>
                    <div className={styles.card} >
                         <div className={styles.container}>
                             <img src={`${Flyo}${image}`} alt={name}/>
                         </div>
                         <div className={styles.name}>
                             <h3>{name}</h3>
                         </div>
                         <div className={styles.description}>
                            <p>{description}</p>
                         </div>
                    </div>
                    {isDiscounted?
                     <div className={styles.promotion}>PROMOTION - {Number(percentage)} % </div> : <div className={styles.noPromotion}></div>}
                    <div style= {{backgroundColor: "lightgrey", height:'5rem'}} >
                        <h3 style={isDiscounted? {color: "red"}: {color : "black"}}>{isDiscounted? <> <strike style={{color : "black"}}> {price} € </strike> <span style={{color : "red", fontWeight: "1000"}}>  {discounted}</span></> : price} €</h3>
                     </div>
                </article>
            </Link>
        </li>
    )
}

export default Product
