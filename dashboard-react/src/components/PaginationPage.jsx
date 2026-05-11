export default function PaginationPage({setPage,pagination,totalUsers,ITEM_PER_PAGE}) {
    return (
        <>
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
        </>
    )
}