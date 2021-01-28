import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import products from './../products';
import Product from './../components/Product';
import { listProducts } from './../actions/productActions';
import Message from './../components/Message';
import Loader from './../components/Loader';
import Paginate from './../components/Paginate';

const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    // const fetchProducts = async() => {
    //   const { data } = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetchProducts();

    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h2>Latest Products</h2>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
      <>
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} ms={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ?  keyword : ''}></Paginate>
      </>
      )}
    </>
  )
}

export default HomeScreen
