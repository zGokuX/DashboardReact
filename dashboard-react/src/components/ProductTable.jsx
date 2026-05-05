export default function ProductsTable(props){
    
    return (
        <>
         <table className="card-table invoices-table" id="table-products">
                    <thead>
                        <tr className="table-header">
                            <th>Id prodotto</th>
                            <th>Nome prodotto</th>
                            <th>{props.modalMode? 'Quantità' : 'Categoria'}</th>
                            <th>Prezzo</th>
                        </tr>
                    </thead>
                    <tbody id="bodyTable">
                        {props.productList.map(item => {
                            return (

                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><img style={{ display: "flex" }} width="50px" src={item.thumbnail} alt="Products Avatar" />{item.title}</td>
                                    <td>{props.modalMode? item.quantity : item.category}</td>
                                    <td>€ {Math.round(item.price)}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
        </>
    )
}