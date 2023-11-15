import styles from './ProductsListAdmin.module.css'
import Header from '../components/Header'
import { useEffect  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { Link , useNavigate, useSearchParams} from 'react-router-dom';
import '../bootstrap/bootstrap.min.css'
import { Col, Row, Table, Button } from 'react-bootstrap';
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'




function ProductsListAdmin() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const {products } = productList;

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const productDelete = useSelector(state => state.productDelete)
    const {success: successDelete, error: errorDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate)
    const {success: successCreate, error: errorCreate, product: createdProduct} = productCreate;

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin
    const keyword = searchParams.get('yourParamName')
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

    }, [dispatch, userInfo, successDelete, successCreate, createdProduct, keyword,navigate, errorCreate])

    const deleteHandler = (id) => {
       if(window.confirm("Are you sure you want to delete this product?")){
        dispatch(deleteProduct(id))
       }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }


    console.log(products)
    
    return (
        <>
        <Header/>
        <main >            
            {products? ( 
            <div className={styles.productsListAdmin}> 
                        <Row className='align-items-center'>
                            <Col>
                                <h1>Products</h1>
                            </Col>
                            <Col className='text-right'>
                                <Button className='my-3' onClick={createProductHandler}>
                                    <i className='fas fa-plus'></i>create Product
                                </Button>
                            </Col>
                        </Row>
                        {errorDelete && <h1 >{errorDelete}</h1>}
                        {errorCreate && <h1 >{errorCreate}</h1>}
                        <Table striped bordered hover responsive className='table-sm'>
                          <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price (€)</th>
                                    <th>Category</th>
                                    <th>Promotion</th>
                                    <th>Discount %</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>New Price (€)</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.discount?"yes" : "no"}</td>
                                    <td>{product.percentage}</td>
                                    <td>{product.startDate}</td>
                                    <td>{product.endDate}</td>
                                    <td>{product.discounted_price}</td>
                                    <td>
                                        <Link to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light'className='btn-sm'><i className='fas fa-edit'></i></Button>
                                        </Link>
                                        <br/>
                                        <br/>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i>
                                        </Button>
                                    </td>   
                                </tr>
                    ))}
                    </tbody>

                        </Table>

                <table>
                    
                </table>                        
             </div>
                    ) : <p>user loading ....</p>}
        </main>
        </>
             )
   }   

export default ProductsListAdmin
