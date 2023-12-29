import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1>Pedidos</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADO</th>
              <th>ENVIADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((pedido) => (
              <tr key={pedido._id}>
                <td>{pedido._id}</td>
                <td>{pedido.user && pedido.user.name}</td>
                <td>{pedido.createdAt.substring(0, 10)}</td>
                <td>{pedido.totalPrice}</td>
                <td>
                  {pedido.isPaid ? (
                    pedido.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  {pedido.isDelivered ? (
                    pedido.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${pedido._id}`}>
                    <Button variant="light" className="btn-sm">
                      Detalle
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
