import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductPage.module.css';
import Header from "../components/Header"
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, Image, ListGroup, Button,Card, Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions';
import { Flyo } from '../constants/URL';




function ProductPage() {
    const [qty, setQty] = useState(1)
    const {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])


console.log(product)

return (
    <>
    <Header/>

       <main>
            <div className={styles.productPage} >
                <Link to='/catalogue' className='btn btn-light my-3'>Go Back</Link>
                {loading ?
                    <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <div>
                                <Row>
                                    <Col md={6}>
                                        <Image src={`${Flyo}${product.image}`} alt={product.name} fluid />
                                    </Col>


                                    <Col md={3}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h3>{product.name}</h3>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Price:  {product.price} €
                                            </ListGroup.Item>
                                            {product.discounted_price && 
                                            new Date(product.startDate) <= new Date() && 
                                            new Date(product.endDate) > new Date() ? (
                                                <ListGroup.Item style={{ color: "red", fontWeight: "1000" }}>
                                                New Price:  {product.discounted_price} €
                                                </ListGroup.Item>
                                            ) : null}                                  
                                            <ListGroup.Item>
                                                Description: {product.description}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>


                                    <Col md={3}>
                                        <Card>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Price:</Col>
                                                        <Col>
                                                            <strong> {product.discounted_price || product.price} €</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col xs='auto' className='my-1'>
                                                                <Form.Control
                                                                    style={{fontSize: "13px"}}
                                                                    as="select"
                                                                    value={qty}
                                                                    onChange={(e) => setQty(e.target.value)}
                                                                >
                                                                    {

                                                                        Array.from({ length: 10 }, (_, i) => (
                                                                            <option style={{fontSize: "13px"}} key={i + 1} value={i + 1}>
                                                                            {i + 1}
                                                                            </option>
                                                                        ))
                                                                    }

                                                                </Form.Control>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                    <Row>
                                                        <Col>TOTAL:</Col>
                                                        <Col>
                                                            <strong> {(qty * (product.discounted_price || product.price)).toFixed(2)} €</strong>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                                <ListGroup.Item>
                                                    <Button
                                                        className='btn-block'
                                                        type='button'>
                                                        <span style={{fontSize: "15px"}}>Add to Cart</span>
                                                    </Button>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                }
        
            </div >
            </main>
    </>
    )
}

export default ProductPage
