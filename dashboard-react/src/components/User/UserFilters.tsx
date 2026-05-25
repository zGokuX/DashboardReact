import { Button, Form, InputGroup } from "react-bootstrap"
import useUserFilter from "./useUserFilter"
export default function UserFilters({ inPage, ...props }) {
    const { filterInput, setFilterInput, filterAge, setFilterAge, filterGender, setFilterGender, filterRole, setFilterRole, filterNames, filterPlus } = useUserFilter()
    return (
        <>

            {inPage && (
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
                                    setFilterAge(Number(value))
                                    filterPlus('age', value)
                                }}
                            />
                        </Form.Group>
                    </div>
                </>
            )}
        </>
    )
}