import { selectAllHistory } from '@/store/slices/LoginUser';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';

function NavBarProfile({setNavBarMarker,navBarMarker}) {
const historyProduct = useSelector(selectAllHistory)
  function setMarker(value){
        if(navBarMarker === value){
            return
        }
        setNavBarMarker(value)
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={() => setMarker(1)} style={{"textDecoration": navBarMarker === 1 ? "underline" : "none"}}>Profile config</Nav.Link>
            <Nav.Link href="#" onClick={() => setMarker(2)} style={{"textDecoration": navBarMarker === 2 ? "underline" : "none"}}>Optional config</Nav.Link>
            {historyProduct && historyProduct?.length > 0 &&
            
            <Nav.Link href="#" onClick={() => setMarker(3)} style={{"textDecoration": navBarMarker === 3 ? "underline" : "none"}}>History payment</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarProfile;