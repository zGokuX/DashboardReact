import { useEffect, useState } from "react"
import fetchUser, { addUser, fetchFilterNames, fetchUserFilter, updateUser } from "../services/requests"
import UserFormModal from "./UserFormModal"
import { Button, Form, InputGroup, Toast, ToastContainer } from "react-bootstrap"
import { Link } from "react-router-dom"

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
              <Button
                variant='outline-primary'
                className='modify-btn'
                onClick={() => editButton(item)}
              >
                Modifica
              </Button>

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
            {props.inPage && (
              <>
                <form action='' onSubmit={e => e.preventDefault()}>
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                        <InputGroup className='mb-3'>
                          <InputGroup.Text id='basic-addon1'>
                            <i
                              className='fa fa-search'
                              aria-hidden='true'
                            ></i>
                          </InputGroup.Text>
                          <Form.Control
                            placeholder="Cerca nome dell'utente"
                            value={filterInput}
                            aria-label='Username'
                            aria-describedby='basic-addon1'
                            onChange={e => {
                              const value = e.target.value
                              setFilterInput(value)
                            }}
                          />
                        </InputGroup>
                      </div>
                      <div className='col'>
                        <Button
                          variant='outline-primary'
                          type='submit'
                          onClick={() => {
                            if (filterInput != '') {
                              filterNames(filterInput)
                            }
                          }}
                        >
                          Cerca
                        </Button>
                      </div>
                      <div className='col'>
                        {' '}
                        <Form.Select
                          aria-label='Default select example'
                          value={filterGender}
                          onChange={e => {
                            const value = e.target.value
                            setFilterGender(value)
                            filterPlus('gender', value)
                          }}
                        >
                          <option value='default'>Genere</option>
                          <option value='male'>Maschio</option>
                          <option value='female'>Femmina</option>
                        </Form.Select>
                      </div>
                      <div className='col'>
                        {' '}
                        <Form.Select
                          aria-label='Default select example'
                          value={filterRole}
                          onChange={e => {
                            const value = e.target.value
                            setFilterRole(value)
                            filterPlus('role', value)
                          }}
                        >
                          <option value='default'>Ruolo</option>
                          <option value='admin'>admin</option>
                          <option value='moderator'>moderatore</option>
                          <option value='user'>utente</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                </form>
                <div className='d-flex p-2 gap-3 ps-4'>
                  <Form.Group className='mb-3'>
                    <Form.Label>Età - {filterAge}</Form.Label>
                    <Form.Range
                      max={140}
                      value={filterAge}
                      onChange={e => {
                        const value = e.target.value
                        setFilterAge(value)
                        filterPlus('age', value)
                      }}
                    />
                  </Form.Group>
                </div>
              </>
            )}

            <table>
              <tbody>{renderUser()}

              </tbody>

            </table>
            {props.inPage &&
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                  e.preventDefault()
                  setPagination(currentValue => {
                    if (currentValue <= 0) {
                      return 0
                    } else {
                      return currentValue - 1
                    }
                  })

                }}>Previous</a></li>

                {pagination > 0 &&
                  <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                    e.preventDefault()
                    setPagination(currentValue => {
                      return currentValue - 1
                    })

                  }}>{pagination}</a></li>
                }

                <li className="page-item"><a className="page-link" href="#">{pagination + 1}</a></li>


                {pagination < (Math.ceil(totalUsers / ITEM_PER_PAGE) - 1) &&
                  <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                    e.preventDefault()
                    setPagination(currentValue => {

                      return currentValue + 1

                    })

                  }}>{pagination + 2}</a></li>
                }
                <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                  e.preventDefault()

                  setPagination(currentValue => {
                    if (currentValue == Math.ceil(totalUsers / ITEM_PER_PAGE) - 1) {
                      return currentValue
                    } else {
                      return currentValue + 1
                    }
                  })



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