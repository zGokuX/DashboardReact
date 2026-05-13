import { Toast, ToastContainer } from "react-bootstrap";

export default function NotificationCartDelete(props) {
    return (
        <ToastContainer
            className='p-3'
            position='bottom-end'
            style={{ zIndex: 1, position: 'fixed' }}
        >
            <Toast
                onClose={() => props.setShowToast(false)}
                show={props.showToast}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <img
                        src='holder.js/20x20?text=%20'
                        className='rounded me-2'
                        alt=''
                    />
                    <strong className='me-auto'>Eliminazione Cart</strong>
                    <small>11 mins ago</small>
                </Toast.Header>

                <Toast.Body>Dati del cart eliminati!</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}