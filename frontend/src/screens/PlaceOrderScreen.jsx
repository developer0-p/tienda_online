import { useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { UseSelector, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckOutSteps'

const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart)

    useEffect(()=>{
        if(!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    },[cart.paymentMethod, cart.shippingAddress.address, navigate])
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
        <Col md={8}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus natus rem voluptas quam eos tempore cumque fuga asperiores commodi consectetur, quo deleniti beatae. Quas adipisci libero doloribus iste minus. Velit.</Col>
        <Col md={4}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt dolorum sunt similique ex illum repudiandae, accusamus dolores fugiat aspernatur, nemo eius dolorem delectus natus totam eligendi voluptatibus asperiores? Sint, nulla?</Col>
    </Row>
    </>
  )
}

export default PlaceOrderScreen