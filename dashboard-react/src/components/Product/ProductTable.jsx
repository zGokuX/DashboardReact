import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ProductModal from './ProductModal'
import PaginationPage from '../Common/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  selectProductsTotal,
} from '@/store/slices/productsSlice'

import { BagPlusFill } from 'react-bootstrap-icons'
import NotificationAddToCart from './NotificationAddToCart'
import { selectIsLogged } from '@/store/slices/LoginUser'

export default function ProductsTable(props) {

  const [selectProduct, setSelectProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const totalProducts = useSelector(selectProductsTotal)
  const isLogged = useSelector(selectIsLogged)

  const [activeProductId, setActiveProductId] = useState(null)
  const [copiedImage, setCopiedImage] = useState(null)
  const [copiedImageCoords, setCopiedImageCoords] = useState(null)

  const [showToast, setShowToast] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [showImage, setShowImage] = useState(false)

  const dispatch = useDispatch()

  function detailsProductButton(product) {
    setSelectProduct(product)
    setShowModal(true)
  }

  useEffect(() => {
    if (showImage) {
      setAnimate(false)
      const timer = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(timer)
    }
  }, [showImage])

  function handleAddToCart(item, e) {
    const isActive = activeProductId === item.id

    if (isActive) {
      setActiveProductId(null)
      setCopiedImage(null)
      setCopiedImageCoords(null)
      setShowImage(false)
      return
    }

    const coords = e.currentTarget.getBoundingClientRect()

    setAnimate(false)
    setShowImage(false)

    setTimeout(() => {
      setCopiedImage(item.thumbnail)
      setCopiedImageCoords(coords)
      setActiveProductId(item.id)
      setShowImage(true)

      dispatch(
        addToCart({
          image: item.thumbnail,
          product: item.title,
          price: item.price,
        })
      )

      setShowToast(true)

      requestAnimationFrame(() => setAnimate(true))
    }, 0)

    setTimeout(() => {
      setActiveProductId(null)
      setCopiedImage(null)
      setShowImage(false)
      setAnimate(false)
    }, 1500)
  }

  return (
    <>
      {showImage && (
        <img
          src={copiedImage}
          className={`movement ${animate ? 'active' : ''}`}
          width='50'
          style={{
            top: copiedImageCoords?.top
              ? copiedImageCoords.top + 'px'
              : '0px',
            right: copiedImageCoords?.right
              ? window.innerWidth - copiedImageCoords.right + 'px'
              : '0px',
          }}
          alt='copied'
        />
      )}

      {showModal && (
        <ProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          product={selectProduct}
          inPage={props.inPage}
          />
        )}
      {props.onceFilter &&
        <Button className='mb-4' style={{"width":"10rem"}} onClick={() => {
          props.filterProductSort('')
          props.setFilterCategory("default")
        }}
        >Resetta i filtri</Button>
      
      }
      <table className='card-table invoices-table'>
        <thead>
          <tr>
            <th>Id prodotto</th>
            <th>Immagine prodotto</th>
            {props.inPage &&
            <>
            <th><a href='#/products' onClick={() => props.filterProductSort('title')}>Nome prodotto</a></th>
            <th><a href='#/products' onClick={() => props.filterProductSort('price')}>Prezzo</a></th>
            <th><a href='#/products' onClick={() => props.filterProductSort('discountPercentage')}>Sconto</a></th>
            </>
            }

            {!props.inPage &&
            <>
            <th>Nome prodotto</th>
            <th>Prezzo</th>
            <th>Sconto</th>
            </>
            }
            
            {!props.inUser && (
              <th>
                {props.modalMode && props.isCarts ? 'Quantità' : 'Categoria'}
              </th>
            )}

            {!props.isCarts && !props.inUser && <th>Disponibilità</th>}

            {!props.isCarts && !props.modalMode && <th></th>}
            {props.modalMode && props.showMoreOption && (
              <>
                <th>Descrizione prodotto</th>
                <th>Valutazioni</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {props.productList?.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img width='50' src={item.thumbnail} />
              </td>
              <td>{item.title}</td>
              <td>€ {Math.round(item.price)}</td>
              <td>{item.discountPercentage != "None" ? item.discountPercentage + "%" : item.discountPercentage + ""}</td>
              <td>
                {props.modalMode && props.isCarts
                  ? item.quantity
                  : item.category}
              </td>
              {!props.isCarts && <td>{item.availabilityStatus}</td>}

              <td className='d-flex gap-2'>


                {props.inPage && (
                  <>
                    <Button onClick={() => detailsProductButton(item)}>
                      See more
                    </Button>
                    {isLogged &&
                      <Button onClick={e => handleAddToCart(item, e)}>
                        <BagPlusFill />
                      </Button>
                    }

                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <NotificationAddToCart
        setShowToast={setShowToast}
        showToast={showToast}
      />

      {props.inPage && !props.onceFilter && (
        <PaginationPage
          setPagination={props.setPagination}
          pagination={props.pagination}
          totalUsers={totalProducts}
        />
      )}
    </>
  )
}