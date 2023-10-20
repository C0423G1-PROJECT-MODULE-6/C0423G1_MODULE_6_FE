import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';


function ModalDelete({showModal, hideModal, confirm }) {

    return (
        <>
            <Modal show={showModal.show} onHide={hideModal}>
                <Modal.Header >
                <h5 className="modal-title">Thông báo!!!</h5>
                </Modal.Header>
                <Modal.Body>Xóa nhận xóa nhân viên: <b>{showModal.info.employeeName}</b>
                            <br></br>
                            Công việc: <b>{showModal.info.employeeTypeName}</b>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-outline-primary" onClick={() => confirm(showModal.info.id)} >Xác nhận</button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={hideModal} >Hủy</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;