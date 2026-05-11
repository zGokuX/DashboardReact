import React, { useEffect, useState } from "react"
import fetchUser, { addUser, fetchCarts, fetchCartsByUserId, fetchFilterNames, fetchUserFilter, updateUser } from "../services/requests"
import UserFormModal from "./UserFormModal"
import { Button, Toast, ToastContainer } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import CartTable from "./CartTable"
import UserFilters from "./UserFilters"

const ITEM_PER_PAGE = 25

export default function RecentUsers(props) {
  const [userList, setUserList] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [filterAge, setFilterAge] = useState(0)
  const [pagination, setPagination] = useState(0)
  const [filterGender, setFilterGender] = useState('default')
  const [filterRole, setFilterRole] = useState('default')
  const [totalUsers, setTotalUsers] = useState(0)
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('')
  const [isNew, setIsNew] = useState(false) //isNew
  const [openedUserId, setOpenedUserId] = useState(false)
  const [cart, setCart] = useState([])
  async function getCart(userId) {
    const cart = await fetchCarts(userId, props.maxViewCarts);

    setCart(cart.carts);
  }
  useEffect(() => {


    async function getUser(maxUser) {
      const userListResponse = await fetchUser(maxUser)
      setTotalUsers(userListResponse.total)
      setUserList(userListResponse.users)
      setAllUsers(userListResponse.users)
    }
    getUser(props.maxViewUser)

  }, [])

  useEffect(() => {
    console.log(props.selectCart)
    fetchUser(ITEM_PER_PAGE, pagination).then((res) => {
      setUserList(res.users)
    })
  }, [pagination])


  function editButton(user) {
    setSelectedUser(user)
    setShowModal(true)
    setIsNew(false)
    setMessage('Modifica utente')
    console.log(user)
  }

  function filterPlus(filterName, value) {
    if (filterName === 'gender') {
      setFilterRole('default')
      setFilterAge(0)
      setFilterInput('')
    } else if (filterName === 'role') {
      setFilterGender('default')
      setFilterAge(0)
      setFilterInput('')
    } else {
      setFilterGender('default')
      setFilterRole('default')
      setFilterInput('')
    }
    if (value === 'default') {
      setUserList(allUsers)
      return
    }

    if (filterName === 'age') {
      const filtered = allUsers.filter(user => user.age == value) /* user.age > value da rivedere */

      if (filtered.length === 0) {
        setUserList(allUsers)
      } else {
        setUserList(filtered)
      }
      return
    }

    fetchUserFilter(filterName, value).then((res) => {
      setUserList(res)
    })
  }

  function setPage(currentValue, goOn) {
    console.log(currentValue, goOn)
    if (goOn && currentValue <= 7) {
      setPagination(currentValue + 1)
      return currentValue + 1
    } else if (!goOn) {
      setPagination(currentValue - 1)
      currentValue = currentValue - 1
    }
    if (currentValue > Math.ceil(totalUsers / ITEM_PER_PAGE) - 1) {
      setPagination(currentValue)
    }
    if (currentValue <= 0) {
      setPagination(0)
      return 0
    }
    return currentValue
  }
  function filterNames(value) {
    setFilterGender('default')
    setFilterRole('default')
    setFilterAge(0)
    console.log(value)
    fetchFilterNames(value).then((res) => {
      setUserList(res)
    })
  }

  function addButton() {
    setShowModal(true)
    setMessage('Aggiungi cliente')
    setIsNew(true)
  }

  function renderUser() {

    return (userList.map(item => {
      // console.log(item)
      return (
        <React.Fragment key={item.id + item.firstName}>
          <tr className='row-list' key={item.id + item.firstName}>
            <td className='client-avatar'>
              <img src={item.image} alt='Client Avatar' />
            </td>
            <td className='client-info'>
              <h5>{item.firstName + ' ' + item.lastName}</h5>
              <h6>{item.company.department}</h6>
            </td>
            {/*                     <td className='client-info'>
                        <span>{item.age}</span>
                    </td> */}
            {props.inPage &&
              <>
                <td className='client-info'>
                  <span>{item.email}</span>
                </td>

                <td className='client-info'>
                  <span>
                    {item.address?.state} {item.address?.city}{' '}
                    {item.address?.address}
                  </span>
                </td>
                <td className='client-info'>
                  <span>{item.phone}</span>
                </td>
              </>
            }

            <td className='client-actions d-flex gap-3 h-25'>
              {props.inPage &&
                <>
                  <Button
                    variant='outline-primary'
                    className='modify-btn'
                    onClick={() => editButton(item)}
                  >
                    Modifica
                  </Button>

                  <Button
                    variant='outline-primary'
                    className='modify-btn'
                    onClick={() => {
                      if (openedUserId === item.id) {
                        setOpenedUserId(null)
                      } else {
                        setOpenedUserId(item.id)
                      }
                      if (!item.carts) {
                        fetchCartsByUserId(item.id).then(cart => {
                          setUserList(userList.map(user => {

                            if (user.id === item.id) {
                              user.carts = cart
                            }
                            return user
                          }))
                        })
                      }

                    }}
                  >
                    Mostra carrelli {openedUserId === item.id ? <CaretUpFill /> : <CaretDownFill />}
                  </Button>
                </>
              }
              {'  '}
              {!props.inPage && (
                <Button
                  variant='outline-primary'
                  className='filter-btn '
                  onClick={() => props.onSelectUser(item)}
                >
                  Filtra
                </Button>
              )}

              <Link to={`/user/${item.id}`}>
                <Button variant='outline-primary' className='filter-btn '>
                  Details
                </Button>
              </Link>
            </td>
          </tr>
          {openedUserId == item.id && item.carts && (
            <tr>
              <td colSpan="6">
                <CartTable
                  cartList={item.carts}
                  userId={props.userId}
                  inPage={props.inPage}
                />
              </td>
            </tr>
          )}
        </React.Fragment>
      )
    }))
  }
  return (
    <>
      {showModal && (
        <UserFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onUserChange={(user, isNewUser) => {
            console.log('E UN NUOVO UTENTE: ', isNewUser)
            console.log('UTENTE: ', user)
            if (isNewUser) {
              setUserList([...userList, user])
              addUser(user).then((res) => console.log(res))
              setShowToast(true)
            } else {
              setUserList(
                userList.map(item => {
                  if (user.id === item.id) {
                    return { ...item, ...user }
                  }
                  return item
                }),
              )
              updateUser(user.id, user).then((res) => console.log(res))
              setShowToast(true)
            }
          }}
          user={selectedUser}
          title={message}
          isNew={isNew}
        />
      )}
      <div
        className={
          'clienti container-full-width' + (props.inPage ? ' in-page' : '')
        }
      >
        <div className='card client-card'>
          <div className='card-title'>
            <h4>Clienti recenti {!props.inPage && (
              <span className='card-actions' id='btn-card-actions'>
                <Link to='/users'>
                  <span className='card-action-list'>Vedi Tutti</span>
                </Link>
              </span>
            )}</h4>

            <button
              className='custom-btn add-client-btn btn btn-primary p-2'
              id='add-clients'
              onClick={addButton}
              style={{ item: '10px' }}
            >
              Aggiungi cliente{' '}
            </button>
          </div>

          <div className='client-list' id='client-list-id'>
            <UserFilters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
            filterNames={filterNames}
            filterGender={filterGender}
            setFilterGender={setFilterGender}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            filterPlus={filterPlus}
            filterAge={filterAge}
            setFilterAge={setFilterAge}
            inPage={props.inPage}
            />

            <table>
              <tbody>{renderUser()}</tbody>
            </table>
            {props.inPage &&
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                  e.preventDefault()
                  setPage(pagination, false)

                }}>Previous</a></li>

                {pagination > 0 &&
                  <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                    e.preventDefault()
                    setPage(pagination, false)

                  }}>{pagination}</a></li>
                }

                <li className="page-item"><a className="page-link" href="#">{pagination + 1}</a></li>


                {pagination < (Math.ceil(totalUsers / ITEM_PER_PAGE) - 1) &&
                  <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                    e.preventDefault()
                    setPage(pagination, true)

                  }}>{pagination + 2}</a></li>
                }
                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                  e.preventDefault()
                  setPage(pagination, true)


                }}>Next</a></li>
              </ul>
            }
          </div>
        </div>

      </div >
      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1, position: "fixed" }}
      >
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>

          <Toast.Body>Dati aggiornati per l'utente!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}