import { Toast, ToastContainer } from "react-bootstrap";

export default function NotificationUserForm( {setShowToast, showToast} ) {
    return (
      <>
        <ToastContainer
          className='p-3'
          position='bottom-end'
          style={{ zIndex: 1, position: 'fixed' }}
        >
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src='holder.js/20x20?text=%20'
                className='rounded me-2'
                alt=''
              />
              <strong className='me-auto'>Aggiornamento dati utente</strong> 
              <small>11 mins ago</small>
            </Toast.Header>

            <Toast.Body>Dati aggiornati per l'utente!</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    )
}