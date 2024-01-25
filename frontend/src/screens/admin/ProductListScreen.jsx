import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice'
import { toast } from 'react-toastify'

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await deleteProduct(id)
        toast.success('Producto borrado')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('¿Seguro que deseas crear un nuevo producto?')) {
      try {
        await createProduct()
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Productos</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit />
            Crear producto
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>CATEGORIA</th>
                <th>MARCA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
