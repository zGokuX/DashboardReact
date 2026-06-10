import { selectIsLogged } from "@/store/slices/LoginUser";
import { useSelector } from "react-redux";


export default function RenderMoreUser(moreUser , ...props){
    const isLogged = useSelector(selectIsLogged);
    console.log(moreUser)
    if(moreUser.length < 0 || moreUser.length == undefined){
        return
    }
    return moreUser.map(item => {
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
          {props.inPage && (
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
          )}

          <td>
            <div className='client-actions d-flex gap-3 h-25 p-1'>
              {props.inPage && (
                <>
                  <Button
                    variant='outline-primary'
                    className='modify-btn'
                    disabled={!isLogged}
                    onClick={() => props.editButton(item)}
                  >
                    Modifica
                  </Button>

                </>
              )}
              {'  '}

              <Link to={`/user/${item.id}`}>
                <Button variant='outline-primary' className='filter-btn '>
                  Details
                </Button>
              </Link>
            </div>
          </td>
        </tr>
      </React.Fragment>
    )
  })
}