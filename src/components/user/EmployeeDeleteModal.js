import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModalDelete({showModal, hideModal, confirm }) {

    return (
        <>
            <Modal show={showModal.show} onHide={hideModal}>
                <Modal.Header >
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Xóa nhận xóa nhân viên: <b>{showModal.info.employeeName}</b>
                            <br></br>
                            Công việc: <b>{showModal.info.employeeTypeName}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={hideModal}>
                        Hủy 
                    </Button>
                    <Button variant="danger" onClick={() => confirm(showModal.info.id)}>    
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;