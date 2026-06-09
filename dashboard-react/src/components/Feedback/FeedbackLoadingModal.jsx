import { Modal } from "react-bootstrap";
import Loading from "@/components/LoadingGif/Loading";

export default function FeedbackLoadingModal({ show }) {
    return (
        <Modal
            show={show}
            size="lg"
            centered
            contentClassName="bg-transparent border-0 shadow-none"
        >
            <Modal.Body className="bg-transparent text-center">
                <Loading height={100} />
            </Modal.Body>
        </Modal>
    );
}