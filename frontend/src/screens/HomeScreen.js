import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import products from './../products';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';
import Message from './../components/Message';
import Loader from './../components/Loader';

const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const keyword = match.params.keyword;

  useEffect(() => {
    // const fetchProducts = async() => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetchProducts();

    dispatch(listProducts(keyword));
  }, [dispatch, keyword])

  return (
    <>
      <h2>Latest Products</h2>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
