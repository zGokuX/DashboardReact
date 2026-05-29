import { Link } from 'react-router-dom'

export default function CartHeader(props) {
  return (
    <div className='card-title'>
      <span>
        <i className='fa-solid fa-cart-shopping me-2'></i>
        Carts
      </span>

      {!props.inPage && (
        <div className='card-actions' id='btn-card-actions'>
          <Link to='/cards'>
            <span className='card-action-list'>Vedi Tutti</span>
          </Link>
        </div>
      )}
    </div>
  )
}
