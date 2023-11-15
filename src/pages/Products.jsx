
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Products.module.css";
import Product from "../components/Product";
import Banner from "../components/Banner";
import { listProducts } from "../actions/productActions";
import Header from "../components/Header";
import Filter from "../components/Filter";

export default function Products() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const [category, setCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredPromotionProducts, setFilteredPromotionProducts] = useState([]);
    const [promotion, setPromotion] = useState(false);



    

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);



    useEffect(() => {
        if (category) {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

    useEffect(() => {
        if (promotion) {
            const filtered = filteredProducts.filter((product) => {
                const today = new Date();
                const startDateObj = new Date(product.startDate);
                const endDateObj = new Date(product.endDate);
                const isDiscounted =   startDateObj <= today && today <= endDateObj;
                return  isDiscounted && product.discount});
            setFilteredPromotionProducts(filtered);
        } else {
            setFilteredPromotionProducts(filteredProducts);
        }
    }, [promotion, filteredProducts]);



    return (
        <>
            <Header />
            <main>
                <Banner onSetPromotion={setPromotion}/>
                <Filter
                    categoryState={category}
                    onSetCategory={setCategory}
                    products={products}
                    promotion= {promotion}
                    onSetPromotion = {setPromotion}
                />
                <section className={styles.products}>
                    <div>
                        <ul>
                            {filteredPromotionProducts.map((product) => (
                                <Product
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    id={product._id}
                                    image={product.image}
                                    discounted={product.discounted_price}
                                    percentage={product.percentage}
                                    endDate={product.endDate}
                                    startDate={product.startDate}
                                    key={product._id}
                                />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}

