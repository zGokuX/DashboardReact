import { useSelector } from "react-redux"
import { ITEM_PER_PAGE } from "@/components/Constants/Constants"
import { selectProductsTotal } from "@/store/slices/productsSlice"
export default function PaginationPage({setPagination,pagination,totalUsers}) {
    const totalProducts = useSelector(selectProductsTotal)

        function setPage(currentValue, goOn) {
        console.log(currentValue, goOn)
        if (goOn && currentValue <= 7) {
            setPagination(currentValue + 1)
            return currentValue + 1
        } else if (!goOn) {
            setPagination(currentValue - 1)
            currentValue = currentValue - 1
        }
        if (currentValue > Math.ceil(totalProducts / ITEM_PER_PAGE) - 1) {
            setPagination(currentValue)
        }
        if (currentValue <= 0) {
            setPagination(0)
            return 0
        }
        return currentValue
    }
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