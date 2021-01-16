import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import products from './../products';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // const fetchProducts = async() => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetchProducts();

    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h2>Latest Products</h2>
      { loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} ms={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      )}
    </>
  )
}

export default HomeScreen
