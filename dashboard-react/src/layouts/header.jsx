import { BoxArrowInLeft, CartFill, GearFill, PersonCircle } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProduct } from '@/store/slices/productsSlice'
import { Link } from 'react-router-dom'

import { Dropdown, DropdownButton } from 'react-bootstrap'
import avatar2 from "../assets/avatars/2.png";
import logo from "../assets/logosite.png";
import { logOutUser, selectIsLogged, selectUserLoggedWithStorage } from '@/store/slices/LoginUser'
export default function Header() {

  const userProduct = useSelector(selectUserProduct)
  const isLogged = useSelector(selectIsLogged)
  const user = useSelector(selectUserLoggedWithStorage).UserLogged
  const dispatch = useDispatch()

  return (
    <>
      <header>
        <div className='topbar-main'>
          <div className='logo-container'>
            <a href='#'>
              <img src={logo} alt='Logo' />
            </a>
          </div>
          <div className='search-container'>
            <div className='search-form'>
              <i className='fa-solid fa-magnifying-glass'></i>
              <input type='text' placeholder='Cerca...' />
            </div>
          </div>
          <div className='user-profile-container'>
            <Link
              className='me-2'
              style={{
                textDecoration: "none",
                ...(userProduct.length > 0
                  ? { position: "relative", top: "7px" }
                  : {})
              }}
              to={isLogged ? '/cartCheckout' : '/login'}
            >
              <div style={{ cursor: 'pointer' }} className='cart-icon ms-3'>
                <CartFill
                  size={21}
                  className='text-light'
                  onClick={() => console.log('PRODOTTI: ', userProduct)}
                />
                {userProduct && userProduct.length > 0 && (
                  <span className='notification-count'>
                    {userProduct.length >= 9 ? '9+' : userProduct.length}
                  </span>
                )}
              </div>
            </Link>
            {!isLogged && (
              <div className='user-profile' id='user-profile-id '>
                <Link to='/login' style={{ textDecoration: "none" }}>
                  <span className='user-name btn btn-outline-primary me-2 d-flex gap-2 align-items-center'>
                    Accedi
                    <PersonCircle size={16} />
                  </span>
                </Link>
              </div>
            )}
            {isLogged && (
              <div className='user-profile' id='user-profile-id'>
                <div className='user-avatar'>
                  <img src={user?.picture?.length > 0 ? user.picture : avatar2} alt='User Avatar' />
                </div>
                <div>
                  <DropdownButton id='dropdown-basic-button' title={user?.name} >
                    <Dropdown.Item href='#/profile'  state={{ navBar: 1 }} className='d-flex gap-2 align-items-center' style={{ fontSize: "15px" }}><PersonCircle size={15} />Il mio profilo</Dropdown.Item>
                    <Dropdown.Item as={Link}
                    style={{ fontSize: "15px" }}
                      to="/profile"
                      state={{ navBar: 2 }}
                      className="d-flex gap-2 align-items-center"
                    >
                      <GearFill size={15} />Optional Config</Dropdown.Item>
                    <Dropdown.Item
                      style={{ fontSize: "15px" }}
                      href='#/'
                      className='bg-danger text-light d-flex gap-2 align-items-center '
                      onClick={() => dispatch(logOutUser())}
                    >
                      <BoxArrowInLeft size={15} />
                      Logout
                    </Dropdown.Item>

                  </DropdownButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
