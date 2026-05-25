import { CartFill, PersonCircle } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { selectUserProduct } from '@/store/slices/productsSlice'
import { Link } from 'react-router-dom'
import { selectIsLogged, selectUserLogged } from '@/store/slices/LoginUser'

export default function Header() {

  const userProduct = useSelector(selectUserProduct)
  const isLogged = useSelector(selectIsLogged)
  const user = useSelector(selectUserLogged).UserLogged
  return (
    <>
      <header>
        <div className='topbar-main'>
          <div className='logo-container'>
            <a href='#'>
              <img src='assets/logosite.png' alt='Logo' />
            </a>
          </div>
          <div className='search-container'>
            <div className='search-form'>
              <i className='fa-solid fa-magnifying-glass'></i>
              <input type='text' placeholder='Cerca...' />
            </div>
          </div>
          <div className='user-profile-container'>
            {/* <div className='notification-user'>
              <i className='fa-solid fa-bell'></i>
              <span className='notification-count'>3</span>
            </div> */}
            <Link style={{ "textDecoration": "none" }} to={isLogged ? '/cartCheckout' : '/login'}>
              <div style={{ cursor: 'pointer' }} className='cart-icon ms-3'>
                <CartFill
                  size={25}
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
                  <PersonCircle size={22}/>
                </Link>
              </div>
            }
            {isLogged &&
              <div className='user-profile' id='user-profile-id'>
                <div className='user-avatar'>
                  <img src='assets/avatars/2.png' alt='User Avatar' />
                </div>
                <div className='user-menu'>
                  <span className='user-name'>
                    {user.name}
                  </span>
                  <ul id='appear-ul'>
                    <li>
                      <a href='#'>Profile</a>
                    </li>
                    <li>
                      <a href='#'>Settings</a>
                    </li>
                    <li>
                      <a href='#'>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            }

          </div>
        </div>
      </header>
    </>
  )
}
