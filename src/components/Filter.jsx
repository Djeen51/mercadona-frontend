import styles from './Filter.module.css';

function Filter({ products, categoryState, onSetCategory, promotion, onSetPromotion }) {
    console.log(products);

    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    
    const handleChange = (category) => {
        onSetCategory(category);
    }

    const handlePromotionChange = () => {
        
       onSetPromotion(!promotion)
    }

    return (
        <div className={styles.filter}>
            <div className={styles.checkboxContainer}>
            <label htmlFor="promotion">PROMOTIONS</label>
                <input checked={promotion} 
                onChange={handlePromotionChange} 
                value={promotion} 
                type="checkbox" 
                id="promotion" 
                name="promotion" />
            </div>
            <label>Category</label>
            <select value={categoryState} onChange={(e) => handleChange(e.target.value)}>
                    <option value="">All</option>
                {uniqueCategories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filter;
