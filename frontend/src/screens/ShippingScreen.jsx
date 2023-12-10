import { useState } from "react";
import { Form, Button, ListGroup, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod, saveShippingAddress } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address) || "";
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [state, setState] = useState(shippingAddress?.state || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const summitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, state }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <CheckOutSteps step2 />
      {/* <h1>Envío y método de pago</h1> */}
      <ListGroup>
        <Row>
          <Col md={8}>
            <>
              <Form onSubmit={summitHandler}>
                <Form.Group controlId="address" className="my-2">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce la dirección de envío"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city" className="my-2">
                  <Form.Label>Ciudad/Población</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce la ciudad de envío"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode" className="my-2">
                  <Form.Label>Código Póstal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce el código postal de envío"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="state" className="my-2">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce el país de envío"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                  Siguiente
                </Button>
              </Form>
            </>
          </Col>
          <Col md={4}>
            <>
              <Form>
                <Form.Group>
                  <Form.Label as="legend">
                    <h4>Selecciona método de pago</h4>
                  </Form.Label>
                  <Col>
                    <Form.Check
                      type="radio"
                      className="my-2"
                      label="PayPal o Tarjeta de Crédito"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      className="my-2"
                      label="Reembolso (no disponible)"
                      id="Reembolso"
                      name="paymentMethod"
                      value="reembolso"
                      disabled
                    ></Form.Check>
                  </Col>
                </Form.Group>
                {/*                 <Button type="submit" variant="primary">
                  Siguiente
                </Button> */}
              </Form>
            </>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default ShippingScreen;
