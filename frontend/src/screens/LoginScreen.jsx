import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
    }
  return (
    <FormContainer>
        <h1>Inicia sesión</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control 
                type='email'
                placeholder='Introduce tu dirección de correo electrónico'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type='password'
                placeholder='Introduce tu contraseña'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2'>Iniciar sesión</Button>
        </Form>
        <Row className='py-3'>
          <Col>
            ¿Eres nuevo? <Link to={'/register'}>Registrate</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen  