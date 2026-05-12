import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, fetchCartsByUserId, fetchFilterNames, fetchUserFilter, updateUser } from "../services/requests"
import { fetchUsers } from "../slices/UserActions"
import { selectUsers, selectUsersTotal } from "../slices/usersSlice"
import UserFormModal from "./UserFormModal"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
import CartTable from "./CartTable"
import UserFilters from "./UserFilters"
import NotificationUserForm from "./NotificationUserForm"
import PaginationPage from "./PaginationPage"

// Importiamo useDispatch e useSelector da react-redux per leggere e scrivere nel store globale.
// useSelector prende i dati dallo stato Redux, mentre useDispatch serve per inviare azioni.

const ITEM_PER_PAGE = 25

export default function RecentUsers(props) {
  const dispatch = useDispatch()
  // Qui leggiamo gli utenti da Redux.
  // Questa è la fonte di verità per i dati utenti, non lo stato locale.
  const users = useSelector(selectUsers)
  const totalUsers = useSelector(selectUsersTotal)
  // filteredUsers viene usato solo per memorizzare il risultato di un filtro locale.
  // Se non c'è alcun filtro, displayedUsers mostra direttamente i dati dal Redux store.
  const [filteredUsers, setFilteredUsers] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filterInput, setFilterInput] = useState('')
  const [filterAge, setFilterAge] = useState(0)
  const [pagination, setPagination] = useState(0)
  const [filterGender, setFilterGender] = useState('default')
  const [filterRole, setFilterRole] = useState('default')
  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')
  const [isNew, setIsNew] = useState(false)
  const [openedUserId, setOpenedUserId] = useState(false)

  // displayedUsers rappresenta la lista visibile.
  // Se c'è un filtro applicato, usiamo filteredUsers, altrimenti la lista completa dal Redux store.
  const displayedUsers = filteredUsers ?? users

  // Effettuiamo il dispatch dell'azione fetchUsers quando il componente viene montato
  // o quando cambia la pagina. Questo aggiorna il Redux store con i nuovi utenti.
  useEffect(() => {
    dispatch(fetchUsers({ pageSize: props.maxViewUser || ITEM_PER_PAGE, page: pagination }))
  }, [dispatch, props.maxViewUser, pagination])

  // Per il view, manteniamo altri stati locali (esempio: modale, filtro),
  // ma la lista reale degli utenti viene presa da Redux.
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
      setFilteredUsers(null)
      return
    }

    if (filterName === 'age') {
      const filtered = users.filter((user) => user.age == value)
      setFilteredUsers(filtered.length === 0 ? null : filtered)
      return
    }

    fetchUserFilter(filterName, value).then((res) => {
      setFilteredUsers(res)
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
    fetchFilterNames(value).then((res) => {
      setFilteredUsers(res)
    })
  }

  function addButton() {
    setShowModal(true)
    setMessage('Aggiungi cliente')
    setIsNew(true)
  }

  function showCart(item) {
    if (openedUserId === item.id) {
      setOpenedUserId(null)
    } else {
      setOpenedUserId(item.id)
    }

    if (!item.carts) {
      fetchCartsByUserId(item.id).then((cartResponse) => {
        setFilteredUsers((prev) =>
          (prev ?? users).map((user) =>
            user.id === item.id ? { ...user, carts: cartResponse } : user,
          ),
        )
      })
    }
  }

  function renderUser() {
    return displayedUsers.map((item) => {
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
                    className='modify-btn text-nowrap'
                    onClick={() => showCart(item)}
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
              <td colSpan="6" style={{"paddingLeft":"30px","paddingRight":"20px"}}>
                <CartTable
                  inUser={true}
                  cartList={item.carts}
                  userId={props.userId}
                  inPage={props.inPage}
                />
              </td>
            </tr>
          )}
        </React.Fragment>
      )
    })
  }
  return (
    <>
      {showModal && (
        <UserFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onUserChange={(user, isNewUser) => {
            if (isNewUser) {
              setFilteredUsers((prev) => [...(prev ?? users), user])
              addUser(user).then((res) => console.log(res))
              setShowToast(true)
            } else {
              setFilteredUsers((prev) =>
                (prev ?? users).map((item) => (item.id === user.id ? { ...item, ...user } : item)),
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
              <PaginationPage
                setPage={setPage}
                pagination={pagination}
                totalUsers={totalUsers}
                ITEM_PER_PAGE={ITEM_PER_PAGE}
              />
            }
          </div>
        </div>

      </div >
      <NotificationUserForm
        setShowToast={setShowToast}
        showToast={showToast}
      />
    </>
  )
}