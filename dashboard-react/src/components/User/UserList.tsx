import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addUser, fetchCartsByUserId, fetchFilterNames, fetchUserFilter, updateUser } from "@/services/requests"
import UserFormModal from "./UserFormModal"
import { Link } from "react-router-dom"
import UserFilters from "./UserFilters"
import NotificationUserForm from "./NotificationUserForm"
import PaginationPage from "../Common/PaginationPage"
import { ITEM_PER_PAGE } from "@/Constants"
import { RenderUser } from "./RenderUser"
import { UnknownAction } from "@reduxjs/toolkit"
import { User } from "./user.type"
import { fetchUsersFilterByNameRequest, fetchUsersFilterRequest, fetchUsersFilterSuccess, fetchUsersRequest, selectUserFiltered, selectUsers, selectUsersTotal } from "@/store/slices/usersSlice"


// Importiamo useDispatch e useSelector da react-redux per leggere e scrivere nel store globale.
// useSelector prende i dati dallo stato Redux, mentre useDispatch serve per inviare azioni.

export default function RecentUsers(props: any) {
  const dispatch = useDispatch()
  // Qui leggiamo gli utenti da Redux.
  // Questa è la fonte di verità per i dati utenti, non lo stato locale.
  const users: null | User[] = useSelector(selectUsers)
  const totalUsers = useSelector(selectUsersTotal)
  const filteredUsers = useSelector(selectUserFiltered)
  // filteredUsers viene usato solo per memorizzare il risultato di un filtro locale.
  // Se non c'è alcun filtro, displayedUsers mostra direttamente i dati dal Redux store.
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
  const [isFiltered, setIsFiltered] = useState(false)

  // displayedUsers rappresenta la lista visibile.
  // Se c'è un filtro applicato, usiamo filteredUsers, altrimenti la lista completa dal Redux store.

  const displayedUsers =
    isFiltered
      ? filteredUsers
      : users
  console.log(filteredUsers)
  // Effettuiamo il dispatch dell'azione fetchUsers quando il componente viene montato
  // o quando cambia la pagina. Questo aggiorna il Redux store con i nuovi utenti.
  function userRequestData() {
    dispatch(fetchUsersRequest({ pageSize: props.maxViewUser || ITEM_PER_PAGE, page: pagination }) as unknown as UnknownAction)
  }
  useEffect(() => {
    userRequestData()
  }, [dispatch, props.maxViewUser, pagination])

  // Per il view, manteniamo altri stati locali (esempio: modale, filtro),
  // ma la lista reale degli utenti viene presa da Redux.
  function editButton(user: any) {
    setSelectedUser(user)
    setShowModal(true)
    setIsNew(false)
    setMessage('Modifica utente')
    console.log(user)
  }

  function filterPlus(filterName: string, value: string) {
    if (filterName === 'gender') {
      setFilterRole('default')
      setFilterAge(0)
      setFilterInput('')
    } else if (filterName === 'role') {
      setFilterGender('default')
      setFilterAge(0)
      setFilterInput('')
    } else if (filterName === 'age') {
      setFilterGender('default')
      setFilterRole('default')
      setFilterInput('')
    }

    if (value === 'default' || value === '' || value === '0') {
      setIsFiltered(false)
      return
    }

    setIsFiltered(true)

    if (filterName === 'age') {
      const filtered = users?.filter((user: any) => user.age > Number(value)) || []

      // setFilteredUsers(filtered)
      return
    }

    dispatch(fetchUsersFilterRequest({ filterName: filterName, value: value }))
    console.log(displayedUsers)

  }
  function filterNames(value: string) {
    setFilterGender('default')
    setFilterRole('default')
    setFilterAge(0)

    if (!value.trim()) {
      setIsFiltered(false)
      return
    }

    setIsFiltered(true)

    dispatch(fetchUsersFilterByNameRequest({ value: value }))
  }
  function addButton() {
    setShowModal(true)
    setMessage('Aggiungi cliente')
    setIsNew(true)
  }

  function CartSubtable(item: any) {
    if (openedUserId === item.id) {
      setOpenedUserId(false)
    } else {
      setOpenedUserId(item.id)
    }

    if (!item.carts) {
      fetchCartsByUserId(item.id).then((cartResponse) => {
        // setFilteredUsers((prev: any) =>
        //   (prev ?? users).map((user: any) =>
        //     user.id === item.id ? { ...user, carts: cartResponse } : user,
        //   ),
        // )
      })
    }
  }
  return (
    <>
      {showModal && (
        <UserFormModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onUserChange={(user: any, isNewUser: any) => {
            if (isNewUser) {
              dispatch(
                fetchUsersFilterSuccess({
                  filteredUser: [...(users ?? []), user],
                })
              )
              addUser(user).then((res) => console.log(res))
              setShowToast(true)
            } else {
              dispatch(
                fetchUsersFilterSuccess({
                  filteredUser: (users ?? []).map((item: any) =>
                    item.id === user.id
                      ? { ...item, ...user }
                      : item
                  ),
                })
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
            {!props.inPage && (
              <h4>Clienti recenti
                <span className='card-actions' id='btn-card-actions'>
                  <Link to='/users'>
                    <span className='card-action-list' style={{ "display": "inline-block", "padding": "5px", "margin": "5px" }}>Vedi Tutti</span>
                  </Link>
                </span>
              </h4>
            )}

            <button
              className='custom-btn add-client-btn btn btn-primary p-2'
              id='add-clients'
              onClick={addButton}
            >
              Aggiungi cliente{' '}
            </button>
          </div>

          <div className='client-list' id='client-list-id'>
            <UserFilters
              // filters={{name:filterNames ...}}
              // onFiltersChange={(changedFilters) => {
              //   setFilterInput(changedFilters.name)
              // }}
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
              <tbody>

                <RenderUser
                  displayedUsers={displayedUsers}
                  inPage={props.inPage}
                  editButton={editButton}
                  showCart={CartSubtable}
                  openedUserId={openedUserId}
                  onSelectUser={props.onSelectUser}
                />
              </tbody>
            </table>
            {props.inPage && !isFiltered &&
              <PaginationPage
                setPagination={setPagination}
                pagination={pagination}
                totalUsers={totalUsers}
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