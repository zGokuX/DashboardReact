import { CartFill, PersonCircle } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProduct } from '@/store/slices/productsSlice'
import { Link } from 'react-router-dom'
import { logOutUser, selectIsLogged, selectUserLogged } from '@/store/slices/LoginUser'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import avatar2 from "../assets/avatars/2.png";
import logo from "../assets/logosite.png";
export default function Header() {

  const userProduct = useSelector(selectUserProduct)
  const isLogged = useSelector(selectIsLogged)
  const user = useSelector(selectUserLogged).UserLogged
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
            <Link style={{ "textDecoration": "none" }} to={isLogged ? '/cartCheckout' : '/login'}>
              <div style={{ cursor: 'pointer' }} className='cart-icon ms-3'>
                <CartFill
                  size={21}
                  onClick={() => console.log('PRODOTTI: ', userProduct)}
                />
                {userProduct && userProduct.length > 0 && (
                  <span className='notification-count'>{userProduct.length >= 9 ? "9+" : userProduct.length}</span>
                )}
              </div>
            </Link>
            {!isLogged &&
              <div className='user-profile' id='user-profile-id'>
                <Link to="/login">
                  <span className='user-name me-2'>
                    Accedi
                  </span>
                  <PersonCircle size={22} />
                </Link>
              </div>
            }
            {isLogged &&
              <div className='user-profile' id='user-profile-id'>
                <div className='user-avatar'>
                  <img src={avatar2} alt='User Avatar' />
                </div>
                <div>
                  <DropdownButton id="dropdown-basic-button" title={user.name}>
                    <Dropdown.Item href="#/profile">Vai al menu</Dropdown.Item>
                    <Dropdown.Item href="#/" className='bg-danger text-light' onClick={() => dispatch(logOutUser())}>Logout</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            }
          </div>
        </div>
      </header>
    </>
  )
}
