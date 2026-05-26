import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarProfile({setNavBarMarker,navBarMarker, ...props}) {
    function setProfileMarker(){
        if(navBarMarker === 1){
            return
        }
        setNavBarMarker(1)
    }
    function setOptionalMarker(){
        if(navBarMarker === 2){
            return
        }
        setNavBarMarker(2)
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={() => setProfileMarker()}>Profile config</Nav.Link>
            <Nav.Link href="#" onClick={() => setOptionalMarker()}>Optional config</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarProfile;