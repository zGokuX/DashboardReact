import { fetchUsersFilterByNameRequest, fetchUsersFilterRequest, fetchUsersFilterSuccess, fetchUsersRequest, selectUserFiltered, selectUsers } from "@/store/slices/usersSlice"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useUserFilter() {
    const dispatch = useDispatch()
    console.log("filtro")

    const [filterInput, setFilterInput] = useState('')
    const [filterAge, setFilterAge] = useState(0)
    const [filterGender, setFilterGender] = useState('default')
    const [filterRole, setFilterRole] = useState('default')
    const [isFiltered, setIsFiltered] = useState(false)
    const users = useSelector(selectUsers)
    const filteredUsers = useSelector(selectUserFiltered)
    const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users

    function filterPlus(filterName: string, value: string) {
        console.log("filtroPLUS")
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

            dispatch(fetchUsersFilterSuccess({ filteredUser: filtered }))
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
    return{filterInput,setFilterInput,filterAge, setFilterAge,filterGender, setFilterGender,filterRole, setFilterRole,filterNames,filterPlus}
}