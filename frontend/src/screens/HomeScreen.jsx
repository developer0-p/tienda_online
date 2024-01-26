import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Product from '../components/Products'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
// import Meta from '../components/Meta'

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  })
  return (
    <>
      {keyword ? (
        <Link to='/' className='btn btn-light mb-4'>
          Volver
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <Meta title='nueva tienda' /> */}
          <h1>Últimas Novedades (Reviews, Search & More (12 de 14))</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
