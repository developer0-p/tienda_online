import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>   
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Tienda_Online" width="30" height="30" className="d-inline-block align-top" />{' '}
                    Tienda Online
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <LinkContainer to="/cart">
                    <Nav.Link><FaShoppingCart/> Carro</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                    <Nav.Link><FaUser/> Inicia sesión</Nav.Link>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>    
    )
}

export default Header