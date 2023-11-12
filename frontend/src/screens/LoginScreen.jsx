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

            </Form.Group>
            <Form.Group controlId='password' className='my-3'>

        </Form.Group>
    </FormContainer>
  )
}

export default LoginScreen  