import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
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
    dispatch(saveShippingAddress({ address, city, postalCode, state }))
    navigate("/payment");
  };
  return (
    <FormContainer>
      <h1>Envío</h1>

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
        <Button type="submit" variant="primary" className="my-2">Siguiente</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
