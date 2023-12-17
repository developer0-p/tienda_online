import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { UseSelector, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data?.message}</Message>
  ) : (
    <>
      <h1>Pedido {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Envío</h2>
              <p>
                Nombre: <strong>{order.user.name}</strong>
              </p>
              <p>
                Email: <strong>{order.user.email}</strong>
              </p>
              <p>
                <strong>Dirección: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {" CP: "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.state}
              </p>
              {order.isDeliver ? (
                <Message variant="success">
                  Enviado el {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">No envíado</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Método de pago</h2>
              <p>Método de pago: {order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Pagado el {order.paidAt}</Message>
              ) : (
                <Message variant="danger">No pagado</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Artículos:</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x {item.price}€ = {item.qty * item.price}€
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumen</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Artículos</Col>
                  <Col>{order.itemsPrice}€</Col>
                </Row>
                <Row>
                  <Col>Envío</Col>
                  <Col>{order.shippingPrice}€</Col>
                </Row>
                <Row>
                  <Col>Impuestos</Col>
                  <Col>{order.taxPrice}€</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
