import {Container, Row, Col} from 'react-bootstrap'


const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <h6>CopyRight &copy; {currentYear} - Pablo Domínguez</h6>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer