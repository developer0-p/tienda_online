import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredencials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading }] = useLoginMutation();

  const {userInfo} = useSelector((state)=> state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(()=>{
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo,redirect, navigate]  )

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredencials({...res}))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  };
  return (
    <FormContainer>
      <h1>Inicia sesión</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce tu dirección de correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Iniciar sesión
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          ¿Eres nuevo? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
            Regístrate
            </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
